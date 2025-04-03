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
  groupEventsFromBatchAll,
} from "./utils";

export async function handleBlock(_block: SubstrateBlock): Promise<void> {
  const {
    block: {
      header: { number, parentHash },
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
  ];
  let blockHasUnlockNominator = false;
  let blockHasWithdrawals = false;
  let withdrawalsResultId = 4;
  if (extrinsics.length > 0) {
    if (
      extrinsics.find(
        (e) =>
          e.method.section === "domains" &&
          e.method.method === "unlockNominator"
      )
    ) {
      blockHasUnlockNominator = true;
      withdrawalsResultId = 5;
      query.push(parentBlockApi.query.domains.operators.entries());
    }
    if (
      extrinsics.find(
        (e) =>
          e.method.section === "domains" && e.method.method === "withdrawStake"
      )
    ) {
      blockHasWithdrawals = true;
      query.push(api.query.domains.withdrawals.entries());
    }
  }
  const queriesResults = await Promise.all(query);

  const operators = queriesResults[0].map((o) => parseOperator(o));

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
        createHashId(data),
        keyPrimitive[0].toString(),
        valuePrimitive.currentEpochIndex.toString(),
        valuePrimitive.currentTotalStake.toString(),
        totalShares,
        sharePrice,
        blockTimestamp,
        height
      )
    );
  });
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

  const operatorOwnerMap = new Map(
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
        operatorOwner ?? "",
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

  if (blockHasUnlockNominator)
    queriesResults[4].forEach((o) =>
      cache.parentBlockOperators.push(parseOperator(o))
    );

  if (blockHasWithdrawals)
    queriesResults[withdrawalsResultId].forEach((o) =>
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

  // Save cache
  await db.saveCache(cache);
}
