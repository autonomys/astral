import { account } from "@autonomys/auto-consensus";
import { stringify } from "@autonomys/auto-utils";
import { getBlockAndMore } from "../chain/calls.ts";
import { api } from "../chain/client.ts";
import { saveAllData } from "../db/save-all.ts";
import { EVENT_HANDLERS } from "../handlers/events.ts";
import { EXTRINSIC_HANDLERS } from "../handlers/extrinsics.ts";
import { EMPTY_SIGNATURE, ZERO_BIGINT } from "../structures/constants.ts";
import { Cache } from "../types/cache.ts";
import {
  createAccountHistory,
  createBlock,
  createEvent,
  createExtrinsic,
  createLeaderboardEntity,
  createLog,
} from "../utils/cache.ts";
import { groupEventsFromBatchAll, parseDataToCid } from "../utils/helper.ts";
import { mappingStates } from "./states.ts";

export const blockMapping = async (cache: Cache) => {
  cache.currentBlock = cache.lastProcessedHeight
    ? cache.lastProcessedHeight + 1
    : 1;
  let eventIndex = 0;

  const START_BLOCK_STAKING = Deno.env.get("START_BLOCK_STAKING") || "1";
  const START_BLOCK_STAKING_NUMBER = parseInt(START_BLOCK_STAKING);

  const {
    apiPatched,
    height,
    hash,
    timestamp,
    date,
    header,
    logs,
    extrinsics,
    events,
    logsCount,
    eventsCount,
    extrinsicsCount,
    spacePledged,
    blockchainSize,
    author,
    specVersion,
    rawOperators,
    rawDomainStakingSummary,
    rawOperatorIdOwner,
  } = await getBlockAndMore(cache, START_BLOCK_STAKING_NUMBER);

  if (START_BLOCK_STAKING_NUMBER <= cache.currentBlock) {
    cache = await mappingStates(
      apiPatched,
      cache,
      date,
      height,
      header.parentHash,
      extrinsics,
      rawOperators,
      rawDomainStakingSummary,
      rawOperatorIdOwner
    );
  }

  const [eventsByExtrinsic, finalizationEvents] = events.reduce<
    [Record<number, typeof events>, typeof events]
  >(
    (acc, event) => {
      if ((event.phase as any).applyExtrinsic !== undefined) {
        const idx = (event.phase as any).applyExtrinsic;
        if (!acc[0][idx]) acc[0][idx] = [];
        acc[0][idx].push(event);
      } else if ((event.phase as any).finalization !== undefined) {
        acc[1].push(event);
      }
      return acc;
    },
    [{}, []]
  );

  logs.forEach((log, index) =>
    cache.logs.push(
      createLog(height, hash, index, log.kind, stringify(log.value), timestamp)
    )
  );

  extrinsics.forEach((extrinsic, extrinsicIdx) => {
    const extrinsicEvents = eventsByExtrinsic[extrinsicIdx] || [];

    const { feeEvent, errorEvent, successEvent } = extrinsicEvents.reduce(
      (
        acc: {
          feeEvent?: (typeof events)[number];
          errorEvent?: (typeof events)[number];
          successEvent?: (typeof events)[number];
        },
        event
      ) => {
        // Check for fee event
        if (
          !acc.feeEvent &&
          event.event.section === "balances" &&
          event.event.method === "Withdraw"
        ) {
          acc.feeEvent = event;
        }
        // Check for error event
        else if (
          !acc.errorEvent &&
          event.event.section === "system" &&
          event.event.method === "ExtrinsicFailed"
        ) {
          acc.errorEvent = event;
        }
        // Check for success event
        else if (
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

    // Calculate fee
    const fee = feeEvent?.event?.data[1]
      ? BigInt(feeEvent.event.data[1].toString())
      : ZERO_BIGINT;
    const error = errorEvent ? stringify(errorEvent.event.data) : "";
    const successEventId = successEvent?.event.index.toString();
    const failEventId = errorEvent?.event.index.toString();

    const pos = extrinsicEvents ? extrinsicIdx : 0;
    const extrinsicSigner = extrinsic.isSigned
      ? extrinsic.signer.toString()
      : "";
    const extrinsicSignature = extrinsic.isSigned
      ? extrinsic.signature.toString()
      : EMPTY_SIGNATURE;
    const extrinsicId = height + "-" + extrinsicIdx.toString();

    // Mapping for leaderboard (basic extrinsic count)
    if (extrinsic.isSigned)
      cache.accountExtrinsicTotalCountHistory.push(
        createLeaderboardEntity(
          extrinsicSigner,
          BigInt(1),
          height,
          hash,
          extrinsicId,
          height + "-" + (successEvent ? successEventId : failEventId),
          date
        )
      );
    if (extrinsic.isSigned && successEvent)
      cache.accountExtrinsicSuccessTotalCountHistory.push(
        createLeaderboardEntity(
          extrinsicSigner,
          BigInt(1),
          height,
          hash,
          extrinsicId,
          height + "-" + successEventId,
          date
        )
      );
    if (extrinsic.isSigned && errorEvent)
      cache.accountExtrinsicFailedTotalCountHistory.push(
        createLeaderboardEntity(
          extrinsicSigner,
          BigInt(1),
          height,
          hash,
          extrinsicId,
          height + "-" + failEventId,
          date
        )
      );

    // Detect data storage extrinsics and parse args to cid
    let cid: string = "";
    let extrinsicArgs: string = stringify(extrinsic.args);
    if (
      (extrinsic.section === "historySeeding" &&
        extrinsic.method === "seedHistory") ||
      (extrinsic.section === "system" &&
        (extrinsic.method === "remarkWithEvent" ||
          extrinsic.method === "remark"))
    ) {
      const parsedArgs = parseDataToCid((extrinsic.args as any).remark);
      cid = parsedArgs.cid ?? "";
      // The args parameter will be replaced by `{ "cid": "bafkr6i..." }` to minimize the size of the db
      extrinsicArgs = parsedArgs.modifiedArgs ?? extrinsicArgs;
    }

    cache.extrinsics.push(
      createExtrinsic(
        extrinsic.hash,
        height,
        hash,
        extrinsicIdx,
        extrinsic.section,
        extrinsic.method,
        successEvent ? true : false,
        date,
        extrinsic.nonce,
        extrinsicSigner,
        extrinsicSignature,
        extrinsicEvents.length,
        extrinsicArgs,
        error,
        extrinsic.tip,
        fee,
        pos,
        cid
      )
    );
    if (extrinsic.isSigned) {
      cache.addressToUpdate.add(extrinsicSigner);

      // Process specific extrinsic
      const extrinsicKey = extrinsic.section + "." + extrinsic.method;
      const handler = EXTRINSIC_HANDLERS[extrinsicKey];
      if (handler)
        handler({
          extrinsicEvents,
          cache,
          height,
          date,
          hash,
          extrinsicId,
          extrinsicSigner,
          extrinsic,
          extrinsicIdx,
        });
    }

    if (extrinsic.section === "utility" && extrinsic.method === "batchAll") {
      const batchedExtrinsicEvents = groupEventsFromBatchAll(extrinsicEvents);
      batchedExtrinsicEvents.forEach((events, eventIdx) => {
        events.forEach((event) => {
          // Process extrinsic events
          // Detect data storage extrinsics and parse args to cid
          let cid: string = "";
          let eventsArgs: string = stringify(event.event.data);
          if (
            event.event.section === "system" &&
            event.event.method === "Remarked"
          ) {
            const parsedArgs = parseDataToCid(event.event.data[1].toString());
            cid = parsedArgs.cid ?? "";
            // The args parameter will be replaced by `{ "cid": "bafkr6i..." }` to minimize the size of the db
            eventsArgs = parsedArgs.modifiedArgs ?? eventsArgs;
          }

          cache.events.push(
            createEvent(
              height,
              hash,
              BigInt(eventIndex),
              extrinsicId,
              extrinsic.hash,
              event.event.section,
              event.event.method,
              date,
              (event.phase as any).applyExtrinsic ?? 0,
              pos,
              eventsArgs,
              cid
            )
          );

          // Process specific events
          const eventKey = event.event.section + "." + event.event.method;
          const handler = EVENT_HANDLERS[eventKey];
          if (handler)
            handler({
              event,
              cache,
              height,
              hash,
              date,
              extrinsicId,
              eventId: height + "-" + eventIndex,
              fee,
              successEvent: successEvent ? true : false,
              extrinsicSigner,
              extrinsicArgs: extrinsic.args,
              extrinsicEvents,
            });

          // Increment event index
          eventIndex++;
        });
      });
    } else {
      // Process extrinsic events
      extrinsicEvents.forEach((event) => {
        // Detect data storage extrinsics and parse args to cid
        let cid: string = "";
        let eventsArgs: string = stringify(event.event.data);
        if (
          event.event.section === "system" &&
          event.event.method === "Remarked"
        ) {
          const parsedArgs = parseDataToCid(event.event.data[1].toString());
          cid = parsedArgs.cid ?? "";
          // The args parameter will be replaced by `{ "cid": "bafkr6i..." }` to minimize the size of the db
          eventsArgs = parsedArgs.modifiedArgs ?? eventsArgs;
        }

        cache.events.push(
          createEvent(
            height,
            hash,
            BigInt(eventIndex),
            extrinsicId,
            extrinsic.hash,
            event.event.section,
            event.event.method,
            date,
            (event.phase as any).applyExtrinsic ?? 0,
            pos,
            eventsArgs,
            cid
          )
        );

        // Process specific events
        const eventKey = event.event.section + "." + event.event.method;
        const handler = EVENT_HANDLERS[eventKey];
        if (handler)
          handler({
            event,
            cache,
            height,
            hash,
            date,
            extrinsicId,
            eventId: height + "-" + eventIndex,
            fee,
            successEvent: successEvent ? true : false,
            extrinsicSigner,
            extrinsicArgs: extrinsic.args,
            extrinsicEvents,
          });

        // Increment event index
        eventIndex++;
      });
    }
  });

  // Process finalization events
  finalizationEvents.forEach((event) => {
    cache.events.push(
      createEvent(
        height,
        hash,
        BigInt(eventIndex),
        "",
        "",
        event.event.section,
        event.event.method,
        date,
        (event.phase as any).finalization ?? 0,
        0,
        stringify(event.event.data),
        ""
      )
    );

    // Process specific events
    const eventKey = event.event.section + "." + event.event.method;
    const handler = EVENT_HANDLERS[eventKey];
    if (handler)
      handler({
        event,
        cache,
        height,
        hash,
        date,
        extrinsicId: "",
        eventId: height + "-" + eventIndex,
        fee: ZERO_BIGINT,
        successEvent: true,
        extrinsicSigner: "",
        extrinsicArgs: {},
        extrinsicEvents: [],
      });

    // Increment event index
    eventIndex++;
  });

  // Update accounts
  const uniqueAddresses = Array.from(cache.addressToUpdate);
  const accounts = await Promise.all(
    uniqueAddresses.map((address) => account(api, address))
  );

  // Create and save accounts
  accounts.forEach((account, i) =>
    cache.accountHistories.push(
      createAccountHistory(
        uniqueAddresses[i],
        height,
        hash,
        BigInt(account.nonce.toString()),
        account.data.free,
        account.data.reserved,
        account.data.free + account.data.reserved
      )
    )
  );

  cache.blocks.push(
    createBlock(
      hash,
      height,
      date,
      header.parentHash,
      specVersion.toString(),
      header.stateRoot,
      header.extrinsicsRoot,
      spacePledged,
      blockchainSize,
      extrinsicsCount,
      eventsCount,
      logsCount,
      cache.transfers.length,
      cache.rewards.length,
      cache.totalBlockRewardsCount,
      cache.totalVoteRewardsCount,
      cache.totalTransferValue,
      cache.totalRewardValue,
      cache.totalBlockRewardValue,
      cache.totalVoteRewardValue,
      author
    )
  );

  await saveAllData(cache);

  return cache;
};
