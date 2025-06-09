global.TextEncoder = require("util").TextEncoder;
global.TextDecoder = require("util").TextDecoder;
global.Buffer = require("buffer/").Buffer;

import { stringify } from "@autonomys/auto-utils";
import { Entity } from "@subql/types-core";
import { EMPTY_SIGNATURE, ZERO_BIGINT } from "./constants";
import {
  createEvent,
  createExtrinsic,
} from "./db";
import { EVENT_HANDLERS } from "./eventHandler";
import { parseDataToCid } from "./helper";
import { ExtrinsicPrimitive } from "./types";
import { groupEventsFromBatchAll } from "./utils";

/**
 * Process a single extrinsic and its events
 */
const processExtrinsic = (
  extrinsic: any,
  extrinsicIdx: number,
  extrinsicEvents: any[],
  context: {
    height: bigint;
    blockHash: string;
    blockTimestamp: Date;
    blockNumber: number;
    cache: any;
    startEventIndex: number;
  }
): {
  extrinsic: Entity;
  events: Entity[];
  addressesToUpdate: Set<string>;
  eventsProcessed: number;
} => {
  const extrinsicProcessStartTime = Date.now();
  const extrinsicHash = extrinsic.hash.toString();
  const extrinsicMethodToPrimitive = extrinsic.method.toPrimitive() as ExtrinsicPrimitive;

  let fee: bigint = ZERO_BIGINT;
  let error = "";
  let success = false;

  const pos = extrinsicEvents.length > 0 ? extrinsicIdx : 0;
  const extrinsicSigner = extrinsic.isSigned ? extrinsic.signer.toString() : "";
  const extrinsicSignature = extrinsic.isSigned ? extrinsic.signature.toString() : EMPTY_SIGNATURE;
  const extrinsicId = context.height + "-" + extrinsicIdx.toString();

  // Detect data storage extrinsics and parse args to cid (for the call itself)
  let cid: string | undefined = "";
  let extrinsicArgs: string = stringify(extrinsicMethodToPrimitive.args);
  if (
    (extrinsic.method.section === "historySeeding" && extrinsic.method.method === "seedHistory") ||
    (extrinsic.method.section === "system" &&
      (extrinsic.method.method === "remarkWithEvent" || extrinsic.method.method === "remark"))
  ) {
    const parsedArgs = parseDataToCid(extrinsicMethodToPrimitive.args.remark);
    cid = parsedArgs.cid;
    extrinsicArgs = parsedArgs.modifiedArgs ?? extrinsicArgs;
  }

  const newEvents: Entity[] = [];
  const addressesToUpdate = new Set<string>();
  let localEventIndex = context.startEventIndex;

  const processSingleEvent = (
    event: typeof extrinsicEvents[number],
    innerPrimitive: any = extrinsicMethodToPrimitive
  ) => {
    // Update fee / error / success flags on the fly
    if (!fee && event.event.section === "balances" && event.event.method === "Withdraw") {
      fee = BigInt(event.event.data[1].toString());
    }
    if (!error && event.event.section === "system" && event.event.method === "ExtrinsicFailed") {
      error = stringify(event.event.data);
    }
    if (!success && event.event.section === "system" && event.event.method === "ExtrinsicSuccess") {
      success = true;
    }

    // Detect data storage event CIDs and args replacement
    let evtCid: string | undefined = "";
    let eventsArgs: string = stringify(event.event.data);
    if (event.event.section === "system" && event.event.method === "Remarked") {
      const parsedArgs = parseDataToCid(event.event.data[1].toString());
      evtCid = parsedArgs.cid;
      eventsArgs = parsedArgs.modifiedArgs ?? eventsArgs;
    }

    newEvents.push(
      createEvent(
        context.height,
        context.blockHash,
        BigInt(localEventIndex),
        extrinsicId,
        extrinsicHash,
        event.event.section,
        event.event.method,
        context.blockTimestamp,
        event.phase.type,
        pos,
        eventsArgs,
        evtCid
      )
    );

    const eventKey = event.event.section + "." + event.event.method;
    const handler = EVENT_HANDLERS[eventKey];
    if (handler) {
      handler({
        event,
        cache: context.cache,
        height: context.height,
        blockHash: context.blockHash,
        blockTimestamp: context.blockTimestamp,
        extrinsicId,
        eventId: context.height + "-" + localEventIndex,
        fee,
        successEvent: success,
        extrinsicSigner,
        extrinsicMethodToPrimitive: innerPrimitive,
      });
    }

    localEventIndex++;
  };

  if (extrinsic.method.section === "utility" && extrinsic.method.method === "batchAll") {
    const batchedExtrinsicEvents = groupEventsFromBatchAll(extrinsicEvents);
    logger.debug(`[Block: ${context.blockNumber}] Extrinsic ${extrinsicIdx} is batchAll with ${batchedExtrinsicEvents.length} inner calls.`);
    batchedExtrinsicEvents.forEach((events, index) => {
      const innerPrimitive = (extrinsic.args[0].toPrimitive() as any)[index];
      events.forEach(evt => processSingleEvent(evt, innerPrimitive));
    });
  } else {
    extrinsicEvents.forEach(evt => processSingleEvent(evt));
  }

  // Create extrinsic entity (we now have fee, error, success)
  const newExtrinsic = createExtrinsic(
    extrinsicHash,
    context.height,
    context.blockHash,
    extrinsicIdx,
    extrinsic.method.section,
    extrinsic.method.method,
    success,
    context.blockTimestamp,
    BigInt(extrinsic.nonce.toString()),
    extrinsicSigner,
    extrinsicSignature,
    extrinsicEvents.length,
    extrinsicArgs,
    error,
    BigInt(extrinsic.tip.toString()),
    fee,
    pos,
    cid
  );

  if (extrinsicSigner) {
    addressesToUpdate.add(extrinsicSigner);
  }

  logger.debug(`[Block: ${context.blockNumber}] Extrinsic ${extrinsicIdx} (${extrinsic.method.section}.${extrinsic.method.method}) processed in ${Date.now() - extrinsicProcessStartTime}ms`);

  return {
    extrinsic: newExtrinsic,
    events: newEvents,
    addressesToUpdate,
    eventsProcessed: localEventIndex - context.startEventIndex
  };
}

export { processExtrinsic };
