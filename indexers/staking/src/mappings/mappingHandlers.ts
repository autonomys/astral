import {
  parseDeposit,
  parseDomain,
  parseOperator,
  parseWithdrawal,
} from "@autonomys/auto-consensus";
import { capitalizeFirstLetter, stringify } from "@autonomys/auto-utils";
import { SubstrateBlock, SubstrateEvent } from "@subql/types";
import * as crypto from "crypto";
import { SHARES_CALCULATION_MULTIPLIER } from "./constants";
import * as db from "./db";

export async function handleBlock(_block: SubstrateBlock): Promise<void> {
  const {
    block: {
      header: { number },
      extrinsics,
    },
    timestamp,
    events,
  } = _block;
  const height = BigInt(number.toString());
  const blockTimestamp = timestamp ? timestamp : new Date();
  // logger.info(`height: ${height}`);

  let cache = db.initializeCache();
  let eventIndex = 0;

  const [
    domainStakingSummary,
    headDomainNumber,
    // nominatorCount,
    operatorIdOwner,
    operators,
    // pendingStakingOperationCount,
  ] = await Promise.all([
    api.query.domains.domainStakingSummary.entries(),
    api.query.domains.headDomainNumber.entries(),
    // api.query.domains.nominatorCount.entries(),
    api.query.domains.operatorIdOwner.entries(),
    api.query.domains.operators.entries(),
    // api.query.domains.pendingStakingOperationCount.entries(),
  ]);

  domainStakingSummary.forEach((data) => {
    const keyPrimitive = data[0].toPrimitive() as any;
    const valuePrimitive = data[1].toPrimitive() as any;
    const hash = crypto
      .createHash("sha256")
      .update(stringify(data))
      .digest("hex");

    cache.domainStakingHistory.push(
      db.createDomainStakingHistory(
        hash,
        keyPrimitive[0].toString(),
        valuePrimitive.currentEpochIndex.toString(),
        valuePrimitive.currentTotalStake.toString(),
        height
      )
    );
  });
  headDomainNumber.forEach((data) => {
    const domainId = (data[0].toHuman() as any)[0].toString();
    const domainBlockNumber = BigInt((data[1].toPrimitive() as any).toString());
    const hash = crypto
      .createHash("sha256")
      .update(stringify(data))
      .digest("hex");
    cache.domainBlockHistory.push(
      db.createDomainBlockHistory(hash, domainId, domainBlockNumber, height)
    );
  });
  // logger.info(`nominatorCount: ${stringify(nominatorCount)}`);

  const operatorOwners = operatorIdOwner.map(([key, value]) => ({
    operatorId: (key.toHuman() as any)[0].toString() as string,
    operatorOwner: value.toPrimitive() as string,
  }));
  operators.forEach((o: any) => {
    const operator = parseOperator(o);
    const operatorOwner = operatorOwners.find(
      (o: any) => o.operatorId === operator.operatorId.toString()
    );
    const hash = crypto
      .createHash("sha256")
      .update(stringify(operator))
      .digest("hex");
    const sharePrice = operator.operatorDetails.currentTotalShares
      ? BigInt(
          operator.operatorDetails.currentTotalStake *
            SHARES_CALCULATION_MULTIPLIER
        ) / BigInt(operator.operatorDetails.currentTotalShares)
      : BigInt(0);
    cache.operatorStakingHistory.push(
      db.createOperatorStakingHistory(
        hash,
        operator.operatorId.toString(),
        operatorOwner?.operatorOwner ?? "",
        operator.operatorDetails.signingKey.toString(),
        operator.operatorDetails.currentDomainId.toString(),
        operator.operatorDetails.currentTotalStake,
        operator.operatorDetails.currentTotalShares,
        operator.operatorDetails.currentEpochRewards,
        operator.operatorDetails.depositsInEpoch,
        operator.operatorDetails.withdrawalsInEpoch,
        operator.operatorDetails.totalStorageFeeDeposit,
        sharePrice,
        height
      )
    );
  });
  // logger.info(
  //   `pendingStakingOperationCount: ${stringify(
  //     pendingStakingOperationCount.map(([key, value]) => ({
  //       key: key.toPrimitive(),
  //       keyPrimitive: key.toPrimitive(),
  //       keyHuman: key.toHuman(),
  //       value: value.toPrimitive(),
  //       valuePrimitive: value.toPrimitive(),
  //       valueHuman: value.toHuman(),
  //     }))
  //   )}`
  // );

  const [deposits, withdrawals] = await Promise.all([
    api.query.domains.deposits.entries(0),
    api.query.domains.withdrawals.entries(0),
  ]);

  deposits.forEach((d: any) => {
    const data = parseDeposit(d);
    const hash = crypto
      .createHash("sha256")
      .update(stringify(data))
      .digest("hex");

    cache.depositHistory.push(
      db.createDepositHistory(
        hash,
        data.account,
        data.operatorId.toString(),
        data.shares,
        data.storageFeeDeposit,
        data.known.shares,
        data.known.storageFeeDeposit,
        data.pending?.effectiveDomainId ?? 0,
        data.pending?.effectiveDomainEpoch ?? 0,
        data.pending?.amount ?? BigInt(0),
        data.pending?.storageFeeDeposit ?? BigInt(0),
        height
      )
    );
  });
  // logger.info(
  //   `withdrawals: ${stringify(withdrawals.map((d: any) => parseWithdrawal(d)))}`
  // );

  const [eventsByExtrinsic, finalizationEvents] = events.reduce<
    [Record<number, typeof events>, typeof events]
  >(
    (acc, event) => {
      if (event.phase.isApplyExtrinsic) {
        const idx = event.phase.asApplyExtrinsic.toNumber();
        if (!acc[0][idx]) acc[0][idx] = [];
        acc[0][idx].push(event);
      } else if (event.phase.isFinalization) {
        acc[1].push(event);
      }
      return acc;
    },
    [{}, []]
  );

  // Process extrinsics
  extrinsics.forEach((extrinsic, extrinsicIdx) => {
    const extrinsicEvents = eventsByExtrinsic[extrinsicIdx] || [];
    const { successEvent } = extrinsicEvents.reduce(
      (
        acc: {
          successEvent?: (typeof events)[number];
        },
        event
      ) => {
        // Check for success event
        if (
          !acc.successEvent &&
          event.event.section === "system" &&
          event.event.method === "ExtrinsicSuccess"
        ) {
          acc.successEvent = event;
        }
        return acc;
      },
      {}
    );
    // const successEventId = successEvent?.event.index.toString() || "";
    const extrinsicId = extrinsic ? height + "-" + extrinsicIdx.toString() : "";
    const extrinsicSigner = extrinsic.signer.toString();

    if (successEvent) {
      // Process specific extrinsic
      // switch (`${extrinsic.method.section}.${extrinsic.method.method}`) {
      //   case "domains.DomainRuntimeCreated": {
      //     // const eventRemarked = extrinsicEvents.find(
      //     //   (e) => e.event.section === "system" && e.event.method === "Remarked"
      //     // );
      //     // const eventRemarkedId = eventRemarked
      //     //   ? height + "-" + eventRemarked.event.index.toString()
      //     //   : "";
      //     // cache.accountRemarkCountHistory.push(
      //     //   db.createAccountRemarkCount(
      //     //     extrinsicSigner,
      //     //     BigInt(1),
      //     //     height,
      //     //     extrinsicId,
      //     //     eventRemarkedId,
      //     //     timestamp
      //     //   )
      //     // );
      //     break;
      //   }
      // }

      // Process extrinsic events
      extrinsicEvents.forEach((event, eventIdx) => {
        const eventId = height + "-" + eventIndex;

        // Process specific events
        switch (`${event.event.section}.${event.event.method}`) {
          case "domains.DomainRuntimeCreated": {
            const runtimeId = event.event.data[0].toString();
            const runtimeType = event.event.data[1].toString();

            const extrinsicArgs = extrinsic.method.args[0].toPrimitive() as any;
            const runtimeName = extrinsicArgs.args.runtime_name;

            cache.runtimeCreation.push(
              db.createRuntimeCreation(
                runtimeId,
                runtimeName,
                runtimeType,
                extrinsicSigner,
                height,
                extrinsicId
              )
            );
            break;
          }
          case "domains.DomainInstantiated": {
            const domainId = event.event.data[0].toString();

            const extrinsicArgs = extrinsic.method.args[0].toPrimitive() as any;
            const domainName = capitalizeFirstLetter(extrinsicArgs.domainName);
            const runtimeId = Number(extrinsicArgs.runtimeId);

            cache.domainInstantiation.push(
              db.createDomainInstantiation(
                domainId,
                domainName,
                runtimeId,
                domainName.toLowerCase(),
                stringify(extrinsicArgs),
                extrinsicSigner,
                height,
                extrinsicId
              )
            );
            break;
          }
          case "domains.OperatorRegistered": {
            const operatorId = event.event.data[1].toString();
            const domainId = event.event.data[1].toString();

            const amount = BigInt(
              String(extrinsic.method.args[1].toPrimitive())
            );
            const operatorDetails =
              extrinsic.method.args[2].toPrimitive() as any;

            const signingKey = operatorDetails.signingKey;
            const minimumNominatorStake = operatorDetails.minimumNominatorStake;
            const nominationTax = operatorDetails.nominationTax;

            const storageFeeDepositedEvent = extrinsicEvents.find(
              (e) =>
                e.phase.isApplyExtrinsic &&
                e.event.section === "domains" &&
                e.event.method === "StorageFeeDeposited"
            );
            const storageFeeDeposit = BigInt(
              storageFeeDepositedEvent?.event.data[2].toString() ?? 0
            );

            cache.operatorRegistration.push(
              db.createOperatorRegistration(
                operatorId,
                extrinsicSigner,
                domainId,
                signingKey,
                minimumNominatorStake,
                nominationTax,
                height,
                extrinsicId
              )
            );
            cache.depositEvent.push(
              db.createDepositEvent(
                extrinsicSigner,
                domainId,
                operatorId,
                amount,
                storageFeeDeposit,
                blockTimestamp,
                height,
                extrinsicId
              )
            );
            break;
          }
          case "domains.OperatorNominated": {
            const operatorId = event.event.data[0].toString();
            const tax = BigInt(event.event.data[1].toString());

            logger.info("handleOperatorNominated");
            logger.info(`extrinsic: ${stringify(extrinsic)}`);
            logger.info(`event: ${stringify(event.event)}`);

            // cache.operatorTotalTaxCollectedHistory.push(
            //   db.createOperatorTotalTaxCollected(
            //     operatorId,
            //     tax,
            //     height,
            //     extrinsicId,
            //     eventId,
            //     timestamp
            //   )
            // );
            break;
            break;
          }
          case "domains.OperatorRewarded": {
            const bundleDetails = event.event.data[0].toPrimitive() as any;
            const operatorId = event.event.data[1].toString();
            const amount = BigInt(event.event.data[2].toString());
            const atBlockNumber = BigInt(
              bundleDetails.bundle.atBlockNumber.toString()
            );

            cache.operatorReward.push(
              db.createOperatorReward(
                operatorId,
                amount,
                atBlockNumber,
                height,
                extrinsicId
              )
            );
            break;
          }
          case "domains.BundleStored": {
            const bundleHash = event.event.data[1].toString();
            // const domainId = event.event.data[0].toString();
            // const operatorId = event.event.data[1].toString();
            // const amount = BigInt(extrinsic.data[0].toString());
            // const nominatorId = extrinsic.signer.toString();

            const _extrinsic = extrinsic.method.args[0].toPrimitive() as any;
            const sealedHeaderHeader = _extrinsic.sealedHeader.header;

            const domainId =
              sealedHeaderHeader.proofOfElection.domainId.toString();
            const operatorId =
              sealedHeaderHeader.proofOfElection.operatorId.toString();

            const {
              domainBlockNumber,
              domainBlockHash,
              domainBlockExtrinsicRoot,
              consensusBlockNumber,
              consensusBlockHash,
              blockFees,
              transfers,
            } = sealedHeaderHeader.receipt;

            const {
              consensusStorageFee,
              domainExecutionFee,
              burnedBalance,
              chainRewards,
            } = blockFees;
            const {
              transfersIn,
              transfersOut,
              rejectedTransfersClaimed,
              transfersRejected,
            } = transfers;

            const totalTransfersIn = Array.isArray(transfersIn)
              ? transfersIn.reduce(
                  (acc, [, amount]) => acc + BigInt(amount),
                  BigInt(0)
                )
              : BigInt(0);
            const transfersInCount = Array.isArray(transfersIn)
              ? BigInt(transfersIn.length)
              : BigInt(0);

            const totalTransfersOut = Array.isArray(transfersOut)
              ? transfersOut.reduce(
                  (acc, [, amount]) => acc + BigInt(amount),
                  BigInt(0)
                )
              : BigInt(0);
            const transfersOutCount = Array.isArray(transfersOut)
              ? BigInt(transfersOut.length)
              : BigInt(0);

            const totalRejectedTransfersClaimed = Array.isArray(
              rejectedTransfersClaimed
            )
              ? rejectedTransfersClaimed.reduce(
                  (acc, [, amount]) => acc + BigInt(amount),
                  BigInt(0)
                )
              : BigInt(0);
            const rejectedTransfersClaimedCount = Array.isArray(
              rejectedTransfersClaimed
            )
              ? BigInt(rejectedTransfersClaimed.length)
              : BigInt(0);

            const totalTransfersRejected = Array.isArray(transfersRejected)
              ? transfersRejected.reduce(
                  (acc, [, amount]) => acc + BigInt(amount),
                  BigInt(0)
                )
              : BigInt(0);
            const transfersRejectedCount = Array.isArray(transfersRejected)
              ? BigInt(transfersRejected.length)
              : BigInt(0);
            const totalVolume = totalTransfersIn + totalTransfersOut;

            cache.bundleSubmission.push(
              db.createBundleSubmission(
                bundleHash,
                extrinsicSigner,
                String(domainId),
                String(domainBlockNumber),
                operatorId,
                BigInt(domainBlockNumber),
                String(domainBlockHash),
                String(domainBlockExtrinsicRoot),
                BigInt(consensusBlockNumber),
                String(consensusBlockHash),
                BigInt(totalTransfersIn),
                transfersInCount,
                BigInt(totalTransfersOut),
                transfersOutCount,
                BigInt(totalRejectedTransfersClaimed),
                rejectedTransfersClaimedCount,
                BigInt(totalTransfersRejected),
                transfersRejectedCount,
                BigInt(totalVolume),
                BigInt(consensusStorageFee),
                BigInt(domainExecutionFee),
                BigInt(burnedBalance)
              )
            );
            break;
          }
          default:
            break;
        }

        // Increment event index
        eventIndex++;
      });
    }
  });

  // Process finalization events
  // finalizationEvents.forEach((event) => {
  //   const extrinsicId = height + "-" + event.phase.type; // AKA (blockHeight-Finalization)
  //   const eventId = height + "-" + eventIndex;

  //   // Process specific events
  //   // switch (`${event.event.section}.${event.event.method}`) {
  //   //   case "rewards.VoteReward": {
  //   //     const voter = event.event.data[0].toString();
  //   //     const reward = BigInt(event.event.data[1].toString());

  //   //     cache.farmerVoteTotalCountHistory.push(
  //   //       db.createFarmerVoteTotalCount(
  //   //         voter,
  //   //         BigInt(1),
  //   //         height,
  //   //         extrinsicId,
  //   //         eventId,
  //   //         timestamp
  //   //       )
  //   //     );

  //   //     break;
  //   //   }
  //   //   case "rewards.BlockReward": {
  //   //     const blockAuthor = event.event.data[0].toString();
  //   //     const reward = BigInt(event.event.data[1].toString());

  //   //     cache.farmerBlockTotalCountHistory.push(
  //   //       db.createFarmerBlockTotalCount(
  //   //         blockAuthor,
  //   //         BigInt(1),
  //   //         height,
  //   //         extrinsicId,
  //   //         eventId,
  //   //         timestamp
  //   //       )
  //   //     );

  //   //     break;
  //   //   }
  //   //   default:
  //   //     break;
  //   // }

  //   // Increment event index
  //   eventIndex++;
  // });

  // Save cache
  await db.saveCache(cache);
}

// export async function handleDomainRuntimeCreated(
//   event: SubstrateEvent
// ): Promise<void> {
//   const {
//     extrinsic,
//     event: { data },
//   } = event;
//   if (extrinsic) {
//     const extrinsicArgs =
//       extrinsic.extrinsic.method.args[0].toPrimitive() as any;
//     const [_runtimeId, _runtimeType] = data;

//     const runtimeName = extrinsicArgs.args.runtime_name;
//     const runtimeId = String(_runtimeId);
//     const runtimeType = String(_runtimeType);
//     const createdBy = extrinsic.extrinsic.signer.toString();
//     const blockHeight = BigInt(event.block.block.header.number.toString());
//     const extrinsicId = `${blockHeight}-${extrinsic.idx}`;

//     await createAndSaveRuntime(
//       runtimeId,
//       runtimeName,
//       runtimeType,
//       createdBy,
//       blockHeight,
//       extrinsicId
//     );
//   }
// }

// export async function handleDomainInstantiated(
//   event: SubstrateEvent
// ): Promise<void> {
//   const {
//     extrinsic,
//     event: { data },
//   } = event;
//   if (extrinsic) {
//     const extrinsicArgs =
//       extrinsic.extrinsic.method.args[0].toPrimitive() as any;
//     const [_domainId, _completedEpochIndex] = data;
//     const domainName = capitalizeFirstLetter(extrinsicArgs.domainName);
//     const runtimeId = Number(extrinsicArgs.runtimeId);
//     const domainId = _domainId.toString();
//     const completedEpoch = BigInt(_completedEpochIndex?.toString() ?? 0);
//     const createdBy = extrinsic.extrinsic.signer.toString();
//     const blockHeight = BigInt(event.block.block.header.number.toString());
//     const extrinsicId = `${blockHeight}-${extrinsic.idx}`;

//     await createAndSaveDomain(
//       domainId,
//       domainName,
//       runtimeId,
//       domainName.toLowerCase(),
//       stringify(extrinsicArgs),
//       completedEpoch,
//       createdBy,
//       blockHeight,
//       extrinsicId
//     );
//   }
// }

// export async function handleOperatorRegistered(
//   event: SubstrateEvent
// ): Promise<void> {
//   const {
//     extrinsic,
//     event: { data },
//   } = event;
//   if (extrinsic) {
//     const domainId = String(extrinsic.extrinsic.method.args[0].toPrimitive());
//     const amount = BigInt(
//       String(extrinsic.extrinsic.method.args[1].toPrimitive())
//     );
//     const operatorDetails =
//       extrinsic.extrinsic.method.args[2].toPrimitive() as any;

//     const signingKey = operatorDetails.signingKey;
//     const minimumNominatorStake = operatorDetails.minimumNominatorStake;
//     const nominationTax = operatorDetails.nominationTax;
//     const eventOperatorId = String(data[0]);
//     const eventDomainId = String(data[1]);
//     if (domainId !== eventDomainId) throw new Error("domainId mismatch");

//     const signer = extrinsic.extrinsic.signer.toString();

//     const blockHeight = BigInt(event.block.block.header.number.toString());
//     const extrinsicId = `${blockHeight}-${extrinsic.idx}`;

//     const storageFeeDepositedEvent = extrinsic.events.find(
//       (e) =>
//         e.phase.isApplyExtrinsic &&
//         e.event.section === "domains" &&
//         e.event.method === "StorageFeeDeposited"
//     );
//     const storageFeeDeposit = BigInt(
//       storageFeeDepositedEvent?.event.data[2].toString() ?? 0
//     );

//     const operator = await createAndSaveOperator(
//       eventOperatorId,
//       signer,
//       domainId,
//       signingKey,
//       minimumNominatorStake,
//       nominationTax,
//       blockHeight,
//       extrinsicId
//     );
//     await createAndSaveDeposit(
//       signer,
//       domainId,
//       eventOperatorId,
//       amount,
//       storageFeeDeposit,
//       extrinsicId,
//       blockHeight
//     );
//   }
// }

// export async function handleOperatorNominated(
//   event: SubstrateEvent
// ): Promise<void> {
//   const {
//     extrinsic,
//     event: { data },
//   } = event;
//   if (extrinsic) {
//     logger.info("handleOperatorNominated");
//     logger.info(`extrinsic: ${stringify(extrinsic)}`);
//     logger.info(`event: ${stringify(event)}`);
//     // const domainId = String(extrinsic.extrinsic.method.args[0].toPrimitive());
//     // const amount = BigInt(
//     //   String(extrinsic.extrinsic.method.args[1].toPrimitive())
//     // );
//     // const operatorDetails =
//     //   extrinsic.extrinsic.method.args[2].toPrimitive() as any;
//     // const signingKey = operatorDetails.signingKey;
//     // const minimumNominatorStake = operatorDetails.minimumNominatorStake;
//     // const nominationTax = operatorDetails.nominationTax;
//     // const eventOperatorId = String(data[0]);
//     // const eventDomainId = String(data[1]);
//     // if (domainId !== eventDomainId) throw new Error("domainId mismatch");
//     // const signer = extrinsic.extrinsic.signer.toString();
//     // const blockHeight = BigInt(event.block.block.header.number.toString());
//     // const extrinsicId = `${blockHeight}-${extrinsic.idx}`;
//     // const storageFeeDepositedEvent = extrinsic.events.find(
//     //   (e) =>
//     //     e.phase.isApplyExtrinsic &&
//     //     e.event.section === "domains" &&
//     //     e.event.method === "StorageFeeDeposited"
//     // );
//     // const storageFeeDeposit = BigInt(
//     //   storageFeeDepositedEvent?.event.data[2].toString() ?? 0
//     // );
//     // await createAndSaveDeposit(
//     //   signer,
//     //   domainId,
//     //   eventOperatorId,
//     //   amount,
//     //   storageFeeDeposit,
//     //   extrinsicId,
//     //   blockHeight
//     // );
//   }
// }

// export async function handleOperatorRewarded(
//   event: SubstrateEvent
// ): Promise<void> {
//   const {
//     extrinsic,
//     event: { data },
//   } = event;
//   if (extrinsic) {
//     const [_bundleDetails, _operatorId, _amount] = data;
//     const operatorId = String(_operatorId);
//     const amount = BigInt(String(_amount));
//     const bundleDetails = _bundleDetails.toPrimitive() as any;
//     const atBlockNumber = BigInt(bundleDetails.bundle.atBlockNumber.toString());

//     const blockHeight = BigInt(event.block.block.header.number.toString());
//     const extrinsicId = `${blockHeight}-${extrinsic.idx}`;

//     await createAndSaveOperatorReward(
//       operatorId,
//       amount,
//       atBlockNumber,
//       extrinsicId,
//       blockHeight
//     );
//   }
// }

// export async function handleBundleStored(event: SubstrateEvent): Promise<void> {
//   const {
//     extrinsic,
//     event: { data },
//     block: { timestamp },
//   } = event;
//   if (extrinsic) {
//     const signer = extrinsic.extrinsic.signer.toString();

//     const _extrinsic = extrinsic.extrinsic.method.args[0].toPrimitive() as any;
//     const sealedHeaderHeader = _extrinsic.sealedHeader.header;

//     const domainId = sealedHeaderHeader.proofOfElection.domainId.toString();
//     const operatorId = sealedHeaderHeader.proofOfElection.operatorId.toString();

//     const {
//       domainBlockNumber,
//       domainBlockHash,
//       domainBlockExtrinsicRoot,
//       consensusBlockNumber,
//       consensusBlockHash,
//       blockFees,
//       transfers,
//     } = sealedHeaderHeader.receipt;

//     const {
//       consensusStorageFee,
//       domainExecutionFee,
//       burnedBalance,
//       chainRewards,
//     } = blockFees;
//     const {
//       transfersIn,
//       transfersOut,
//       rejectedTransfersClaimed,
//       transfersRejected,
//     } = transfers;

//     const totalTransfersIn = Array.isArray(transfersIn)
//       ? transfersIn.reduce((acc, [, amount]) => acc + BigInt(amount), BigInt(0))
//       : BigInt(0);
//     const transfersInCount = Array.isArray(transfersIn)
//       ? BigInt(transfersIn.length)
//       : BigInt(0);

//     const totalTransfersOut = Array.isArray(transfersOut)
//       ? transfersOut.reduce(
//           (acc, [, amount]) => acc + BigInt(amount),
//           BigInt(0)
//         )
//       : BigInt(0);
//     const transfersOutCount = Array.isArray(transfersOut)
//       ? BigInt(transfersOut.length)
//       : BigInt(0);

//     const totalRejectedTransfersClaimed = Array.isArray(
//       rejectedTransfersClaimed
//     )
//       ? rejectedTransfersClaimed.reduce(
//           (acc, [, amount]) => acc + BigInt(amount),
//           BigInt(0)
//         )
//       : BigInt(0);
//     const rejectedTransfersClaimedCount = Array.isArray(
//       rejectedTransfersClaimed
//     )
//       ? BigInt(rejectedTransfersClaimed.length)
//       : BigInt(0);

//     const totalTransfersRejected = Array.isArray(transfersRejected)
//       ? transfersRejected.reduce(
//           (acc, [, amount]) => acc + BigInt(amount),
//           BigInt(0)
//         )
//       : BigInt(0);
//     const transfersRejectedCount = Array.isArray(transfersRejected)
//       ? BigInt(transfersRejected.length)
//       : BigInt(0);
//     const totalVolume = totalTransfersIn + totalTransfersOut;

//     const bundleStoredEvent = extrinsic.events.find(
//       (e) =>
//         e.phase.isApplyExtrinsic &&
//         e.event.section === "domains" &&
//         e.event.method === "BundleStored"
//     );
//     if (!bundleStoredEvent) throw new Error("BundleStored event not found");
//     const bundleHash = bundleStoredEvent.event.data[1].toString();

//     await createAndSaveBundleSubmission(
//       bundleHash,
//       signer,
//       String(domainId),
//       String(domainBlockNumber),
//       operatorId,
//       BigInt(domainBlockNumber),
//       String(domainBlockHash),
//       String(domainBlockExtrinsicRoot),
//       BigInt(consensusBlockNumber),
//       String(consensusBlockHash),
//       BigInt(totalTransfersIn),
//       transfersInCount,
//       BigInt(totalTransfersOut),
//       transfersOutCount,
//       BigInt(totalRejectedTransfersClaimed),
//       rejectedTransfersClaimedCount,
//       BigInt(totalTransfersRejected),
//       transfersRejectedCount,
//       BigInt(totalVolume),
//       BigInt(consensusStorageFee),
//       BigInt(domainExecutionFee),
//       BigInt(burnedBalance)
//     );
//   }
// }
