import { capitalizeFirstLetter, stringify } from "@autonomys/auto-utils";
import { SubstrateEvent } from "@subql/types";
import {
  createAndSaveBundleStored,
  createAndSaveDeposit,
  createAndSaveDomainInstantiated,
  createAndSaveOperatorRegistered,
  createAndSaveOperatorReward,
  createAndSaveRuntime,
} from "./db";

export async function handleDomainRuntimeCreated(
  event: SubstrateEvent
): Promise<void> {
  const {
    extrinsic,
    event: { data },
  } = event;
  if (extrinsic) {
    const extrinsicArgs =
      extrinsic.extrinsic.method.args[0].toPrimitive() as any;
    const [_runtimeId, _runtimeType] = data;

    const runtimeName = extrinsicArgs.args.runtime_name;
    const runtimeId = String(_runtimeId);
    const runtimeType = String(_runtimeType);
    const createdBy = extrinsic.extrinsic.signer.toString();
    const blockHeight = BigInt(event.block.block.header.number.toString());
    const extrinsicId = `${blockHeight}-${extrinsic.idx}`;

    await createAndSaveRuntime(
      runtimeId,
      runtimeName,
      runtimeType,
      createdBy,
      blockHeight,
      extrinsicId
    );
  }
}

export async function handleDomainInstantiated(
  event: SubstrateEvent
): Promise<void> {
  const {
    extrinsic,
    event: { data },
  } = event;
  if (extrinsic) {
    const extrinsicArgs =
      extrinsic.extrinsic.method.args[0].toPrimitive() as any;
    const [_domainId, _completedEpochIndex] = data;
    const domainName = capitalizeFirstLetter(extrinsicArgs.domainName);
    const runtimeId = Number(extrinsicArgs.runtimeId);
    const domainId = _domainId.toString();
    const completedEpoch = BigInt(_completedEpochIndex?.toString() ?? 0);
    const createdBy = extrinsic.extrinsic.signer.toString();
    const blockHeight = BigInt(event.block.block.header.number.toString());
    const extrinsicId = `${blockHeight}-${extrinsic.idx}`;

    await createAndSaveDomainInstantiated(
      domainId,
      domainName,
      runtimeId,
      domainName.toLowerCase(),
      stringify(extrinsicArgs),
      completedEpoch,
      createdBy,
      blockHeight,
      extrinsicId
    );
  }
}

export async function handleOperatorRegistered(
  event: SubstrateEvent
): Promise<void> {
  const {
    extrinsic,
    event: { data },
  } = event;
  if (extrinsic) {
    const domainId = String(extrinsic.extrinsic.method.args[0].toPrimitive());
    const amount = BigInt(
      String(extrinsic.extrinsic.method.args[1].toPrimitive())
    );
    const operatorDetails =
      extrinsic.extrinsic.method.args[2].toPrimitive() as any;

    const signingKey = operatorDetails.signingKey;
    const minimumNominatorStake = operatorDetails.minimumNominatorStake;
    const nominationTax = operatorDetails.nominationTax;
    const eventOperatorId = String(data[0]);
    const eventDomainId = String(data[1]);
    if (domainId !== eventDomainId) throw new Error("domainId mismatch");

    const signer = extrinsic.extrinsic.signer.toString();

    const blockHeight = BigInt(event.block.block.header.number.toString());
    const extrinsicId = `${blockHeight}-${extrinsic.idx}`;

    const storageFeeDepositedEvent = extrinsic.events.find(
      (e) =>
        e.phase.isApplyExtrinsic &&
        e.event.section === "domains" &&
        e.event.method === "StorageFeeDeposited"
    );
    const storageFeeDeposit = BigInt(
      storageFeeDepositedEvent?.event.data[2].toString() ?? 0
    );

    const operator = await createAndSaveOperatorRegistered(
      eventOperatorId,
      signer,
      domainId,
      signingKey,
      minimumNominatorStake,
      nominationTax,
      blockHeight,
      extrinsicId
    );
    await createAndSaveDeposit(
      signer,
      domainId,
      eventOperatorId,
      amount,
      storageFeeDeposit,
      extrinsicId,
      blockHeight
    );
  }
}

export async function handleOperatorNominated(
  event: SubstrateEvent
): Promise<void> {
  const {
    extrinsic,
    event: { data },
  } = event;
  if (extrinsic) {
    logger.info("handleOperatorNominated");
    logger.info(`extrinsic: ${stringify(extrinsic)}`);
    logger.info(`event: ${stringify(event)}`);
    // const domainId = String(extrinsic.extrinsic.method.args[0].toPrimitive());
    // const amount = BigInt(
    //   String(extrinsic.extrinsic.method.args[1].toPrimitive())
    // );
    // const operatorDetails =
    //   extrinsic.extrinsic.method.args[2].toPrimitive() as any;
    // const signingKey = operatorDetails.signingKey;
    // const minimumNominatorStake = operatorDetails.minimumNominatorStake;
    // const nominationTax = operatorDetails.nominationTax;
    // const eventOperatorId = String(data[0]);
    // const eventDomainId = String(data[1]);
    // if (domainId !== eventDomainId) throw new Error("domainId mismatch");
    // const signer = extrinsic.extrinsic.signer.toString();
    // const blockHeight = BigInt(event.block.block.header.number.toString());
    // const extrinsicId = `${blockHeight}-${extrinsic.idx}`;
    // const storageFeeDepositedEvent = extrinsic.events.find(
    //   (e) =>
    //     e.phase.isApplyExtrinsic &&
    //     e.event.section === "domains" &&
    //     e.event.method === "StorageFeeDeposited"
    // );
    // const storageFeeDeposit = BigInt(
    //   storageFeeDepositedEvent?.event.data[2].toString() ?? 0
    // );
    // await createAndSaveDeposit(
    //   signer,
    //   domainId,
    //   eventOperatorId,
    //   amount,
    //   storageFeeDeposit,
    //   extrinsicId,
    //   blockHeight
    // );
  }
}

export async function handleOperatorRewarded(
  event: SubstrateEvent
): Promise<void> {
  const {
    extrinsic,
    event: { data },
  } = event;
  if (extrinsic) {
    const [_bundleDetails, _operatorId, _amount] = data;
    const operatorId = String(_operatorId);
    const amount = BigInt(String(_amount));
    const bundleDetails = _bundleDetails.toPrimitive() as any;
    const atBlockNumber = BigInt(bundleDetails.bundle.atBlockNumber.toString());

    const blockHeight = BigInt(event.block.block.header.number.toString());
    const extrinsicId = `${blockHeight}-${extrinsic.idx}`;

    await createAndSaveOperatorReward(
      operatorId,
      amount,
      atBlockNumber,
      extrinsicId,
      blockHeight
    );
  }
}

export async function handleBundleStored(event: SubstrateEvent): Promise<void> {
  const {
    extrinsic,
    event: { data },
    block: { timestamp },
  } = event;
  if (extrinsic) {
    const signer = extrinsic.extrinsic.signer.toString();

    const _extrinsic = extrinsic.extrinsic.method.args[0].toPrimitive() as any;
    const sealedHeaderHeader = _extrinsic.sealedHeader.header;

    const domainId = sealedHeaderHeader.proofOfElection.domainId.toString();
    const operatorId = sealedHeaderHeader.proofOfElection.operatorId.toString();

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
      ? transfersIn.reduce((acc, [, amount]) => acc + BigInt(amount), BigInt(0))
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

    const bundleStoredEvent = extrinsic.events.find(
      (e) =>
        e.phase.isApplyExtrinsic &&
        e.event.section === "domains" &&
        e.event.method === "BundleStored"
    );
    if (!bundleStoredEvent) throw new Error("BundleStored event not found");
    const bundleHash = bundleStoredEvent.event.data[1].toString();

    await createAndSaveBundleStored(
      bundleHash,
      signer,
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
    );
  }
}
