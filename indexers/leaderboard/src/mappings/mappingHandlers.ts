import { SubstrateBlock } from "@subql/types";
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

  let cache = db.initializeCache();
  let eventIndex = 0;

  // Process extrinsics
  extrinsics.forEach((extrinsic, extrinsicIdx) => {
    const extrinsicEvents = events.filter(
      (e) =>
        e.phase.isApplyExtrinsic &&
        e.phase.asApplyExtrinsic.toNumber() === extrinsicIdx
    );
    const successEvent = events.find(
      (e) =>
        e.event.section === "system" && e.event.method === "ExtrinsicSuccess"
    );
    const successEventId = events.findIndex(
      (e) =>
        e.event.section === "system" && e.event.method === "ExtrinsicSuccess"
    );
    const extrinsicId = extrinsic ? height + "-" + extrinsicIdx.toString() : "";
    const extrinsicSigner = extrinsic.signer.toString();

    cache.accountExtrinsicTotalCountHistory.push(
      db.createAccountExtrinsicTotalCount(
        extrinsicSigner,
        BigInt(1),
        height,
        extrinsicId,
        height + "-" + successEventId.toString(),
        timestamp
      )
    );
    if (successEvent) {
      cache.accountExtrinsicSuccessTotalCountHistory.push(
        db.createAccountExtrinsicSuccessTotalCount(
          extrinsicSigner,
          BigInt(1),
          height,
          extrinsicId,
          height + "-" + successEventId.toString(),
          timestamp
        )
      );

      // Process specific extrinsic
      switch (`${extrinsic.method.section}.${extrinsic.method.method}`) {
        case "system.remark":
        case "system.remarkWithEvent": {
          cache.accountRemarkCountHistory.push(
            db.createAccountRemarkCount(
              extrinsicSigner,
              BigInt(1),
              height,
              extrinsicId,
              "",
              timestamp
            )
          );
          break;
        }
      }

      // Process extrinsic events
      extrinsicEvents.forEach((event, eventIdx) => {
        const eventId = height + "-" + eventIndex;

        // Process specific events
        switch (`${event.event.section}.${event.event.method}`) {
          case "balances.Transfer": {
            const from = event.event.data[0].toString();
            const to = event.event.data[1].toString();
            const amount = BigInt(event.event.data[2].toString());

            cache.accountTransferSenderTotalCountHistory.push(
              db.createAccountTransferSenderTotalCount(
                from,
                BigInt(1),
                height,
                extrinsicId,
                eventId,
                timestamp
              )
            );
            cache.accountTransferSenderTotalValueHistory.push(
              db.createAccountTransferSenderTotalValue(
                from,
                amount,
                height,
                extrinsicId,
                eventId,
                timestamp
              )
            );

            cache.accountTransferReceiverTotalCountHistory.push(
              db.createAccountTransferReceiverTotalCount(
                to,
                BigInt(1),
                height,
                extrinsicId,
                eventId,
                timestamp
              )
            );
            cache.accountTransferReceiverTotalValueHistory.push(
              db.createAccountTransferReceiverTotalValue(
                to,
                amount,
                height,
                extrinsicId,
                eventId,
                timestamp
              )
            );
            break;
          }
          case "transactionPayment.TransactionFeePaid": {
            const who = event.event.data[0].toString();
            const actualFee = BigInt(event.event.data[1].toString());
            const tip = BigInt(event.event.data[2].toString());

            cache.accountTransactionFeePaidTotalValueHistory.push(
              db.createAccountTransactionFeePaidTotalValue(
                who,
                actualFee + tip,
                height,
                extrinsicId,
                eventId,
                timestamp
              )
            );
            break;
          }
          case "domains.OperatorRewarded": {
            const operatorId = event.event.data[0].toString();
            const reward = BigInt(event.event.data[1].toString());
            if (reward === BigInt(0)) break;

            cache.operatorTotalRewardsCollectedHistory.push(
              db.createOperatorTotalRewardsCollected(
                operatorId,
                reward,
                height,
                extrinsicId,
                eventId,
                timestamp
              )
            );
            break;
          }
          case "domains.OperatorTaxCollected": {
            const operatorId = event.event.data[0].toString();
            const tax = BigInt(event.event.data[1].toString());

            cache.operatorTotalTaxCollectedHistory.push(
              db.createOperatorTotalTaxCollected(
                operatorId,
                tax,
                height,
                extrinsicId,
                eventId,
                timestamp
              )
            );
            break;
            break;
          }
          case "domains.BundleStored": {
            const bundleAuthor = event.event.data[0].toString();

            cache.operatorBundleTotalCountHistory.push(
              db.createOperatorBundleTotalCount(
                bundleAuthor,
                BigInt(1),
                height,
                extrinsicId,
                eventId,
                timestamp
              )
            );
            break;
          }
          case "domains.OperatorRegistered": {
            const operatorId = event.event.data[0].toString();
            const reward = BigInt(event.event.data[1].toString());

            cache.operatorTotalRewardsCollectedHistory.push(
              db.createOperatorTotalRewardsCollected(
                operatorId,
                reward,
                height,
                extrinsicId,
                eventId,
                timestamp
              )
            );
            break;
          }
          case "domains.OperatorNominated": {
            const operatorId = event.event.data[0].toString();
            const nominatorId = event.event.data[1].toString();
            const amount = BigInt(event.event.data[2].toString());

            cache.operatorDepositsTotalCountHistory.push(
              db.createOperatorDepositsTotalCount(
                operatorId,
                BigInt(1),
                height,
                extrinsicId,
                eventId,
                timestamp
              )
            );
            cache.operatorDepositsTotalValueHistory.push(
              db.createOperatorDepositsTotalValue(
                operatorId,
                amount,
                height,
                extrinsicId,
                eventId,
                timestamp
              )
            );

            cache.nominatorDepositsTotalCountHistory.push(
              db.createNominatorDepositsTotalCount(
                nominatorId,
                BigInt(1),
                height,
                extrinsicId,
                eventId,
                timestamp
              )
            );
            cache.nominatorDepositsTotalValueHistory.push(
              db.createNominatorDepositsTotalValue(
                nominatorId,
                amount,
                height,
                extrinsicId,
                eventId,
                timestamp
              )
            );
            break;
          }
          case "domains.WithdrewStake": {
            const operatorId = event.event.data[0].toString();
            const nominatorId = event.event.data[1].toString();

            cache.operatorWithdrawalsTotalCountHistory.push(
              db.createOperatorWithdrawalsTotalCount(
                operatorId,
                BigInt(1),
                height,
                extrinsicId,
                eventId,
                timestamp
              )
            );
            cache.nominatorWithdrawalsTotalCountHistory.push(
              db.createNominatorWithdrawalsTotalCount(
                nominatorId,
                BigInt(1),
                height,
                extrinsicId,
                eventId,
                timestamp
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
    } else {
      // Process fail extrinsic
      cache.accountExtrinsicFailedTotalCountHistory.push(
        db.createAccountExtrinsicFailedTotalCount(
          extrinsicSigner,
          BigInt(1),
          height,
          extrinsicId,
          height + "-" + successEventId.toString(),
          timestamp
        )
      );
    }
  });

  const finalizationEvents = events.filter((e) => e.phase.isFinalization);

  // Process finalization events
  finalizationEvents.forEach((event) => {
    const extrinsicId = height + "-" + event.phase.type; // AKA (blockHeight-Finalization)
    const eventId = height + "-" + eventIndex;

    // Process specific events
    switch (`${event.event.section}.${event.event.method}`) {
      case "rewards.VoteReward": {
        const voter = event.event.data[0].toString();
        const reward = BigInt(event.event.data[1].toString());

        cache.farmerVoteTotalCountHistory.push(
          db.createFarmerVoteTotalCount(
            voter,
            BigInt(1),
            height,
            extrinsicId,
            eventId,
            timestamp
          )
        );
        cache.farmerVoteTotalValueHistory.push(
          db.createFarmerVoteTotalValue(
            voter,
            reward,
            height,
            extrinsicId,
            eventId,
            timestamp
          )
        );

        cache.farmerVoteAndBlockTotalCountHistory.push(
          db.createFarmerVoteAndBlockTotalCount(
            voter,
            BigInt(1),
            height,
            extrinsicId,
            eventId,
            timestamp
          )
        );
        cache.farmerVoteAndBlockTotalValueHistory.push(
          db.createFarmerVoteAndBlockTotalValue(
            voter,
            reward,
            height,
            extrinsicId,
            eventId,
            timestamp
          )
        );

        break;
      }
      case "rewards.BlockReward": {
        const blockAuthor = event.event.data[0].toString();
        const reward = BigInt(event.event.data[1].toString());

        cache.farmerBlockTotalCountHistory.push(
          db.createFarmerBlockTotalCount(
            blockAuthor,
            BigInt(1),
            height,
            extrinsicId,
            eventId,
            timestamp
          )
        );
        cache.farmerBlockTotalValueHistory.push(
          db.createFarmerBlockTotalValue(
            blockAuthor,
            reward,
            height,
            extrinsicId,
            eventId,
            timestamp
          )
        );

        cache.farmerVoteAndBlockTotalCountHistory.push(
          db.createFarmerVoteAndBlockTotalCount(
            blockAuthor,
            BigInt(1),
            height,
            extrinsicId,
            eventId,
            timestamp
          )
        );
        cache.farmerVoteAndBlockTotalValueHistory.push(
          db.createFarmerVoteAndBlockTotalValue(
            blockAuthor,
            reward,
            height,
            extrinsicId,
            eventId,
            timestamp
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

  // Save cache
  await db.saveCache(cache);
}