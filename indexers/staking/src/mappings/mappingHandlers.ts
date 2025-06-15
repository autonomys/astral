import { parseOperator, parseWithdrawal } from "@autonomys/auto-consensus";
import { stringify } from "@autonomys/auto-utils";
import { SubstrateBlock } from "@subql/types";
import { SHARES_CALCULATION_MULTIPLIER, ZERO_BIGINT } from "./constants";
import * as db from "./db";
import { EVENT_HANDLERS } from "./eventHandler";
import { ExtrinsicPrimitive } from "./types";
import {
  aggregateByDomainId,
  createHashId,
  deriveOperatorEpochSharePrices,
  detectEpochTransitions,
  groupEventsFromBatchAll,
} from "./utils";


export async function handleBlock(_block: SubstrateBlock): Promise<void> {
  const {
    block: {
      header: { number, parentHash, hash },
      extrinsics,
    },
    timestamp,
    events,
  } = _block;
  if (!extrinsics.find((e) => e.method.section === "domains")) return;

  const height = BigInt(number.toString());
  const blockTimestamp = timestamp ? timestamp : new Date();

  let cache = db.initializeCache();
  let eventIndex = 0;

  // FIX: Between 824014 and 835747 on Taurus Testnet domains.operators() return a parsing error, so in between these blocks, we query at the last valid block instead
  const apiPatched =
    unsafeApi && height > 824013 && height < 835748
      ? await unsafeApi.at(
          "0x77cc55c79e3adfbe38c79ce3475e2cace1c47e3a04166dc2ca9b1cfd49c26f5f"
        )
      : api;

  // Use to query the parent block operators (for the last unlock of an operator (unlockNominator))
  /*
    One optimization is to store the parent block api and data in global variable to avoid re-querying the same data when processing the next block!
  */
  const parentBlockApi = unsafeApi
    ? height > 824013 && height <= 835748
      ? apiPatched
      : await unsafeApi.at(parentHash)
    : api;

  const query = [
    apiPatched.query.domains.operators.entries(),
    api.query.domains.domainStakingSummary.entries(),
    api.query.domains.headDomainNumber.entries(),
    api.query.domains.operatorIdOwner.entries(),
    // NOTE: deposits are queried later on-demand to avoid fetching large, mostly unchanged data
  ];

  // No depositsResultId since deposits are handled later
  let parentBlockOperatorsIndex: number | null = null;
  let withdrawalsResultId: number | null = null;
  let currentQueryIndex = 4; // next index after the static queries
  
  let blockHasUnlockNominator = false;
  let blockHasWithdrawals = false;
  
  if (extrinsics.length > 0) {
    if (
      extrinsics.find(
        (e) =>
          e.method.section === "domains" &&
          e.method.method === "unlockNominator"
      )
    ) {
      blockHasUnlockNominator = true;
      parentBlockOperatorsIndex = currentQueryIndex;
      query.push(parentBlockApi.query.domains.operators.entries());
      currentQueryIndex++;
    }
    if (
      extrinsics.find(
        (e) =>
          e.method.section === "domains" && e.method.method === "withdrawStake"
      )
    ) {
      blockHasWithdrawals = true;
      withdrawalsResultId = currentQueryIndex;
      query.push(api.query.domains.withdrawals.entries());
      currentQueryIndex++;
    }
  }
  const queriesResults = await Promise.all(query);

  // api.query.domains.operators.entries(),
  /*
  * signingKey
  * currentDomainId
  * nextDomainId
  * minimumNominatorStake
  * nominationTax
  * currentTotalStake
  * currentTotalShares
  * partialStatus
  * depositsInEpoch
  * withdrawalsInEpoch
  * totalStorageFeeDeposit
  */
  const operators = queriesResults[0].map((o) => parseOperator(o));

  // api.query.domains.domainStakingSummary.entries(),
  /*
  * currentEpochIndex
  * currentTotalStake
  * currentOperators
  * nextOperators
  * currentEpochRewards
  */
  //logging the whole queriesResults[1]

  const currentDomainStakingSummary = queriesResults[1];
  // Detect epoch transitions
  const epochTransitions = await detectEpochTransitions(
    currentDomainStakingSummary,
    parentBlockApi,
    height
  );

  // -------------------------------------------------------------------
  // Derive and store OperatorEpochSharePrice for each transitioned domain
  // -------------------------------------------------------------------
  if (epochTransitions.length > 0) {
    const operatorEpochSharePrices = deriveOperatorEpochSharePrices(
      epochTransitions,
      operators,
      blockTimestamp,
      height
    );

    operatorEpochSharePrices.forEach((sharePrice) => {
      cache.operatorEpochSharePrice.push(
        db.createOperatorEpochSharePrice(
          sharePrice.operatorId,
          sharePrice.domainId,
          sharePrice.parentEpoch,
          sharePrice.sharePrice,
          sharePrice.totalStake,
          sharePrice.totalShares,
          sharePrice.blockTimestamp,
          sharePrice.height
        )
      );
    });
  }

  // // Build domain summary map for quick access (used later for deposits processing)
  // const domainSummaryMap = new Map<string, any>();
  // currentDomainStakingSummary.forEach((d: any) => {
  //   const domainId = (d[0].toPrimitive() as any)[0].toString();
  //   domainSummaryMap.set(domainId, d[1].toPrimitive() as any);
  // });

  // // Build operator epoch share price map (used later for deposits processing)
  // const oeMap = new Map<string, bigint>();
  // [...cache.operatorEpochSharePrice].forEach((p) => {
  //   oeMap.set(
  //     `${p.operatorId}-${p.domainId}-${p.epochIndex}`,
  //     BigInt(p.sharePrice.toString())
  //   );
  // });

  // logger.info(`queriesResults[1]: ${JSON.stringify(queriesResults[1])}`);
  queriesResults[1].forEach((data) => {
    const keyPrimitive = data[0].toPrimitive() as any;
    const valuePrimitive = data[1].toPrimitive() as any;
    const domainId = keyPrimitive[0].toString();
    const { totalStake, totalShares } = aggregateByDomainId(
      operators,
      BigInt(domainId)
    );
    const sharePrice = totalStake > 0 ? totalStake / totalShares : ZERO_BIGINT;
    cache.domainStakingHistory.push(
      db.createDomainStakingHistory(
        createHashId(data), // id
        keyPrimitive[0].toString(), // domainId
        valuePrimitive.currentEpochIndex.toString(), // currentEpochIndex
        valuePrimitive.currentTotalStake.toString(), // currentTotalStake
        totalShares, // currentTotalShares
        sharePrice, // sharePrice
        blockTimestamp, // timestamp
        height // blockHeight
      )
    );
  });

  // api.query.domains.headDomainNumber.entries(),
  /*
  * domainId
  * domainBlockNumber
  */
  queriesResults[2].forEach((data) => {
    const domainId = (data[0].toHuman() as any)[0].toString();
    const domainBlockNumber = BigInt((data[1].toPrimitive() as any).toString());
    cache.domainBlockHistory.push(
      db.createDomainBlockHistory(
        createHashId(data),
        domainId,
        domainBlockNumber,
        blockTimestamp,
        height
      )
    );
  });


  /*
   START createOperatorStakingHistory
  */
  const operatorOwnerMap = new Map(
    // api.query.domains.operatorIdOwner.entries(),
    /*
    * operatorId
    * owner
    */
    queriesResults[3].map(([key, value]) => [
      (key.toHuman() as any)[0].toString(),
      value.toPrimitive() as string,
    ])
  );
  operators.forEach((operator) => {
    const operatorOwner = operatorOwnerMap.get(operator.operatorId.toString());
    const sharePrice = operator.operatorDetails.currentTotalShares
      ? BigInt(
          operator.operatorDetails.currentTotalStake *
            SHARES_CALCULATION_MULTIPLIER
        ) / BigInt(operator.operatorDetails.currentTotalShares)
      : ZERO_BIGINT;
    cache.operatorStakingHistory.push(
      db.createOperatorStakingHistory(
        createHashId(operator),
        operator.operatorId.toString(),
        operatorOwner ?? "", // Why it can be empty?
        operator.operatorDetails.signingKey.toString(),
        operator.operatorDetails.currentDomainId.toString(),
        operator.operatorDetails.currentTotalStake,
        operator.operatorDetails.currentTotalShares,
        operator.operatorDetails.depositsInEpoch,
        operator.operatorDetails.withdrawalsInEpoch,
        operator.operatorDetails.totalStorageFeeDeposit,
        sharePrice,
        stringify(operator.operatorDetails.partialStatus),
        blockTimestamp,
        height
      )
    );
  });
  /*
   END createOperatorStakingHistory
  */



  /*
  * 
  */
  if (blockHasUnlockNominator)
    queriesResults[parentBlockOperatorsIndex!].forEach((o) =>
      cache.parentBlockOperators.push(parseOperator(o))
    );

  if (blockHasWithdrawals)
    queriesResults[withdrawalsResultId!].forEach((o) =>
      cache.currentWithdrawal.push(parseWithdrawal(o))
    );


  const eventsByExtrinsic = new Map<number, typeof events>();
  for (const event of events) {
    if (event.phase.isApplyExtrinsic) {
      const idx = event.phase.asApplyExtrinsic.toNumber();
      if (!eventsByExtrinsic.has(idx)) {
        eventsByExtrinsic.set(idx, []);
      }
      eventsByExtrinsic.get(idx)!.push(event);
    }
  }

  // Process extrinsics
  extrinsics.forEach((extrinsic, extrinsicIdx) => {
    const extrinsicEvents = eventsByExtrinsic.get(extrinsicIdx) || [];
    const extrinsicMethodToPrimitive =
      extrinsic.method.toPrimitive() as ExtrinsicPrimitive;
    // Why finding the last success event?
    const successEvent = extrinsicEvents.findLast(
      (event) =>
        event.event.section === "system" &&
        event.event.method === "ExtrinsicSuccess"
    );
    // const successEventId = successEvent?.event.index.toString() || "";
    const extrinsicId = extrinsic ? height + "-" + extrinsicIdx.toString() : "";
    const extrinsicSigner = extrinsic.isSigned
      ? extrinsic.signer.toString()
      : "";

    if (successEvent) {
      if (
        extrinsic.method.section === "utility" &&
        extrinsic.method.method === "batchAll"
      ) {
        const batchedExtrinsicEvents = groupEventsFromBatchAll(extrinsicEvents);
        batchedExtrinsicEvents.forEach((events, index) => {
          const extrinsicArgs = (extrinsic.args[0].toPrimitive() as any)[index];
          events.forEach((event) => {
            const eventId = height + "-" + eventIndex;

            // Process specific events
            const eventKey = event.event.section + "." + event.event.method;
            const handler = EVENT_HANDLERS[eventKey];
            if (handler)
              handler({
                event,
                extrinsicMethodToPrimitive: extrinsicArgs,
                cache,
                height,
                blockTimestamp,
                extrinsicId,
                eventId,
                extrinsicSigner,
                extrinsicEvents: events,
              });

            // Increment event index
            eventIndex++;
          });
        });
      } else {
        // Process extrinsic events
        extrinsicEvents.forEach((event) => {
          const eventId = height + "-" + eventIndex;

          // Process specific events
          const eventKey = event.event.section + "." + event.event.method;
          const handler = EVENT_HANDLERS[eventKey];
          if (handler)
            handler({
              event,
              extrinsicMethodToPrimitive,
              cache,
              height,
              blockTimestamp,
              extrinsicId,
              eventId,
              extrinsicSigner,
              extrinsicEvents,
            });

          // Increment event index
          eventIndex++;
        });
      }
    }
  });



  // cache.unlockedEvent.forEach((d) =>
  //   changedNominationKeys.add(`${d.operatorId}-${d.accountId}`)
  // );

  // -------------------------------------------------------------------
  // Derive & store Nominator Deposits only for changed nominations
  // -------------------------------------------------------------------
  if (cache.nominatorDepositEvent.length > 0) {
    const depositsEntries = await Promise.all(
      cache.nominatorDepositEvent.map(async (d) => {
        const res = await api.query.domains.deposits(
          Number(d.operatorId),
          d.accountId.toString()
        );
        const result = res.toHuman() as any;
        return {
          id: createHashId(result),
          accountId: d.accountId,
          operatorId: d.operatorId,
          domainId: result.pending.effectiveDomainEpoch[0].toString(),
          knownShares: BigInt(result.known.shares.toString().replace(/,/g, "")),
          knownStorageFeeDeposit: BigInt(result.known.storageFeeDeposit.toString().replace(/,/g, "")),
          pendingAmount: BigInt(result.pending.amount.toString().replace(/,/g, "")),
          pendingStorageFeeDeposit: BigInt(result.pending.storageFeeDeposit.toString().replace(/,/g, "")),
          pendingEffectiveDomainEpoch: BigInt(result.pending.effectiveDomainEpoch[1].toString().replace(/,/g, "")),
          eventId: d.eventId,
          extrinsicId: d.extrinsicId,
          timestamp: blockTimestamp,
          blockHeight: height
        }
      })
    );

    depositsEntries.forEach((d) => {
      cache.nominatorDeposit.push(
        db.createNominatorDeposit(
          d.id,
          d.accountId,
          d.operatorId,
          d.domainId,
          d.knownShares,
          d.knownStorageFeeDeposit,
          d.pendingAmount,
          d.pendingStorageFeeDeposit,
          d.pendingEffectiveDomainEpoch,
          d.extrinsicId,
          d.eventId,
          d.timestamp,
          d.blockHeight,
          false
        )
      );
    });
  }


  // -------------------------------------------------------------------
  // Derive & store Nominator Withdrawals only for changed nominations
  // -------------------------------------------------------------------
  /*
  Sample result of the query:
    {
      totalWithdrawalAmount: 1,600,022,075,474,813,470
      totalStorageFeeWithdrawal: 698,484,970,837,929,109
      withdrawals: [
        {
          unlockAtConfirmedDomainBlockNumber: 1,383,476
          amountToUnlock: 1,600,022,075,474,813,470
          storageFeeRefund: 399,122,776,157,064,938
        }
      ]
      withdrawalInShares: {
        domainEpoch: [
          0
          14,198
        ]
        unlockAtConfirmedDomainBlockNumber: 1,434,070
        shares: 728,815,124,400,000,000
        storageFeeRefund: 299,362,194,680,864,171
      }
    }

    totalWithdrawalAmount = sum(item_of(withdrawals).amountToUnlock) , not include the value of withdrawalInShares.shares 
    totalStorageFeeWithdrawal = sum(item_of(withdrawals).storageFeeRefund) + withdrawalInShares.storageFeeRefund

    Note: it means on staking worker after epoch transitions we have to compute shares*sharePrice of withdrawalsInShares and add a new entry for withdrawals.

    Transition from withdrawalsInShares to withdrawals happens lazily.
  */
  if (cache.withdrawEvent.length > 0) {
    const withdrawalsEntries = await Promise.all(
      cache.withdrawEvent.map(async (d) => {
        const res = await api.query.domains.withdrawals(
          Number(d.operatorId),
          d.accountId.toString()
        );
        const result = res.toHuman() as any;
        logger.info(`result: ${JSON.stringify(result)}`);
        return {
          id: createHashId(result),
          accountId: d.accountId,
          operatorId: d.operatorId,
          domainId: d.accountId.toString(),
          totalWithdrawalAmount: BigInt(result.totalWithdrawalAmount.toString().replace(/,/g, "")),
          totalStorageFeeWithdrawal: BigInt(result.totalStorageFeeWithdrawal.toString().replace(/,/g, "")),
          // Detailed withdrawals information
          withdrawalsJson: stringify(result.withdrawals ?? []),
          totalPendingWithdrawals: BigInt((result.withdrawals ?? []).length),

          // In-shares (pending) withdrawal details
          domainEpoch: BigInt(result.withdrawalInShares.domainEpoch[1].toString().replace(/,/g, "")),
          unlockAtConfirmedDomainBlockNumber: BigInt(result.withdrawalInShares.unlockAtConfirmedDomainBlockNumber.toString().replace(/,/g, "")),
          shares: BigInt(result.withdrawalInShares.shares.toString().replace(/,/g, "")),
          storageFeeRefund: BigInt(result.withdrawalInShares.storageFeeRefund.toString().replace(/,/g, "")),

          timestamp: blockTimestamp,
          blockHeight: height
        }
      })
    );

    // Store each withdrawal entry as a NominatorWithdrawal entity
    withdrawalsEntries.forEach((w) => {
      cache.nominatorWithdrawal.push(
        db.createNominatorWithdrawal(
          w.id,
          w.accountId,
          w.operatorId,
          w.domainId,
          w.shares, // withdrawalInSharesAmount (shares)
          w.storageFeeRefund, // withdrawalInSharesStorageFeeRefund
          w.domainEpoch.toString(),
          w.unlockAtConfirmedDomainBlockNumber,
          w.totalWithdrawalAmount,
          w.totalStorageFeeWithdrawal,
          w.withdrawalsJson,
          w.totalPendingWithdrawals,
          w.timestamp,
          w.blockHeight,
          false
        )
      );
    });
  }


  // Save cache
  await db.saveCache(cache);
}
