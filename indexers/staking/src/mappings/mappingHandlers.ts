import { parseDeposit, parseOperator } from "@autonomys/auto-consensus";
import { stringify } from "@autonomys/auto-utils";
import { SubstrateBlock } from "@subql/types";
import { SHARES_CALCULATION_MULTIPLIER, ZERO_BIGINT } from "./constants";
import * as db from "./db";
import { EVENT_HANDLERS } from "./eventHandler";
import { createHashId } from "./utils";

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

  let cache = db.initializeCache();
  let eventIndex = 0;

  // FIX: Between 824014 and 835747 on Taurus Testnet domains.operators() return a parsing error, so in between these blocks, we query at the last valid block instead
  const apiPatched =
    unsafeApi && height > 824013 && height < 835748
      ? await unsafeApi.at(
          "0x77cc55c79e3adfbe38c79ce3475e2cace1c47e3a04166dc2ca9b1cfd49c26f5f"
        )
      : api;

  const [domainStakingSummary, headDomainNumber, operatorIdOwner, operators] =
    await Promise.all([
      api.query.domains.domainStakingSummary.entries(),
      api.query.domains.headDomainNumber.entries(),
      api.query.domains.operatorIdOwner.entries(),
      apiPatched.query.domains.operators.entries(),
    ]);

  domainStakingSummary.forEach((data) => {
    const keyPrimitive = data[0].toPrimitive() as any;
    const valuePrimitive = data[1].toPrimitive() as any;
    cache.domainStakingHistory.push(
      db.createDomainStakingHistory(
        createHashId(data),
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
    cache.domainBlockHistory.push(
      db.createDomainBlockHistory(
        createHashId(data),
        domainId,
        domainBlockNumber,
        height
      )
    );
  });

  const operatorOwnerMap = new Map(
    operatorIdOwner.map(([key, value]) => [
      (key.toHuman() as any)[0].toString(),
      value.toPrimitive() as string,
    ])
  );
  operators.forEach((o: any) => {
    const operator = parseOperator(o);
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
        height
      )
    );
  });
  const operatorStateMap = new Map(
    cache.operatorStakingHistory.map((op) => [op.operatorId, op])
  );

  const deposits = (
    await Promise.all(
      operatorIdOwner.map((o) =>
        api.query.domains.deposits.entries(
          (o[0].toHuman() as any)[0].toString()
        )
      )
    )
  ).flat();
  deposits.forEach((d: any) => {
    const data = parseDeposit(d);
    cache.depositHistory.push(
      db.createDepositHistory(
        createHashId(data),
        data.account,
        data.operatorId.toString(),
        data.shares,
        data.storageFeeDeposit,
        data.known.shares,
        data.known.storageFeeDeposit,
        data.pending?.effectiveDomainId ?? 0,
        data.pending?.effectiveDomainEpoch ?? 0,
        data.pending?.amount ?? ZERO_BIGINT,
        data.pending?.storageFeeDeposit ?? ZERO_BIGINT,
        height
      )
    );
  });
  // const withdrawals = (
  //   await Promise.all(
  //     operatorIdOwner.map((o) =>
  //       api.query.domains.withdrawals.entries(
  //         (o[0].toHuman() as any)[0].toString()
  //       )
  //     )
  //   )
  // ).flat();
  // logger.info(
  //   `withdrawals: ${stringify(withdrawals.map((d: any) => parseWithdrawal(d)))}`
  // );

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
    const successEvent = extrinsicEvents.findLast(
      (event) =>
        event.event.section === "system" &&
        event.event.method === "ExtrinsicSuccess"
    );
    // const successEventId = successEvent?.event.index.toString() || "";
    const extrinsicId = extrinsic ? height + "-" + extrinsicIdx.toString() : "";
    const extrinsicSigner = extrinsic.signer.toString();

    if (successEvent) {
      // Process extrinsic events
      extrinsicEvents.forEach((event) => {
        const eventId = height + "-" + eventIndex;

        // Process specific events
        const eventKey = event.event.section + "." + event.event.method;
        const handler = EVENT_HANDLERS[eventKey];
        if (handler) {
          handler({
            event,
            extrinsic,
            cache,
            height,
            blockTimestamp,
            extrinsicId,
            eventId,
            extrinsicSigner,
            extrinsicEvents,
            operatorStates: operatorStateMap,
          });
        }

        // Increment event index
        eventIndex++;
      });
    }
  });

  // Save cache
  await db.saveCache(cache);
}
