import { account } from "@autonomys/auto-consensus";
import { stringify } from "@autonomys/auto-utils";
import { getBlockAndMore } from "../chain/calls.ts";
import { api } from "../chain/client.ts";
import { saveAllData } from "../db/save-all.ts";
import { EVENT_HANDLERS } from "../handlers/events.ts";
import { EMPTY_SIGNATURE, ZERO_BIGINT } from "../structures/constants.ts";
import { Cache } from "../types/cache.ts";
import {
  createAccountHistory,
  createBlock,
  createEvent,
  createExtrinsic,
  createLog,
} from "../utils/cache.ts";
import { groupEventsFromBatchAll } from "../utils/helper.ts";

export const blockMapping = async (cache: Cache) => {
  cache.currentBlock = cache.lastProcessedHeight
    ? cache.lastProcessedHeight + 1
    : 1;
  let eventIndex = 0;

  const {
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
    author,
    specVersion,
  } = await getBlockAndMore(cache);

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
        stringify(extrinsic.args),
        error,
        extrinsic.tip,
        fee,
        pos
      )
    );
    if (extrinsic.isSigned) {
      cache.addressToUpdate.add(extrinsicSigner);
    }

    if (extrinsic.section === "utility" && extrinsic.method === "batchAll") {
      const batchedExtrinsicEvents = groupEventsFromBatchAll(extrinsicEvents);
      batchedExtrinsicEvents.forEach((events, eventIdx) => {
        events.forEach((event) => {
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
              stringify(event.event.data)
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
            stringify(event.event.data)
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
        stringify(event.event.data)
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
      extrinsicsCount,
      eventsCount,
      logsCount,
      cache.transfers.length,
      cache.totalTransferValue,
      author
    )
  );

  await saveAllData(cache);

  return cache;
};
