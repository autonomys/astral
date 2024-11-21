global.TextEncoder = require("util").TextEncoder;
global.TextDecoder = require("util").TextDecoder;

import { blockchainSize, spacePledge } from "@autonomys/auto-consensus";
import type { ApiAtBlockHash } from "@autonomys/auto-utils";
import { stringify } from "@autonomys/auto-utils";
import {
  SubstrateBlock,
  SubstrateEvent,
  SubstrateExtrinsic,
} from "@subql/types";
import {
  createAndSaveBlock,
  createAndSaveEvent,
  createAndSaveExtrinsic,
  createAndSaveLog,
} from "./db";
import { getBlockAuthor, parseDataToCid } from "./helper";
import {
  handleExtrinsic,
  handleFarmerBlockRewardEvent,
  handleFarmerVoteRewardEvent,
  handleTransferEvent,
} from "./mappingAccountHandlers";
import {
  EventHuman,
  EventPrimitive,
  ExtrinsicHuman,
  ExtrinsicPrimitive,
  LogValue,
} from "./types";

export async function handleBlock(_block: SubstrateBlock): Promise<void> {
  const {
    block: {
      header: { number, parentHash, stateRoot, extrinsicsRoot, digest },
      hash,
      extrinsics,
    },
    timestamp,
    specVersion,
    events,
  } = _block;
  const height = BigInt(number.toString());
  const blockHash = hash.toString();
  const blockTimestamp = timestamp ? timestamp : new Date(0);
  // Get block author
  const authorId = getBlockAuthor(_block);

  // Calculate space pledged and blockchain size concurrently
  const [_spacePledged, _blockchainSize] = await Promise.all([
    spacePledge(api as unknown as ApiAtBlockHash),
    blockchainSize(api as unknown as ApiAtBlockHash),
  ]);

  const eventsCount = events.length;
  const extrinsicsCount = extrinsics.length;

  // Create block
  await createAndSaveBlock(
    blockHash,
    height,
    blockTimestamp,
    parentHash.toString(),
    specVersion.toString(),
    stateRoot.toString(),
    extrinsicsRoot.toString(),
    _spacePledged,
    _blockchainSize,
    extrinsicsCount,
    eventsCount,
    authorId
  );

  // Create and save block logs
  await Promise.all(
    digest.logs.map((log, i) => {
      const logData = log.toHuman();
      const logJson = log.toPrimitive();
      const kind = logData ? Object.keys(logData)[0] : "";
      const rawKind = logJson ? Object.keys(logJson)[0] : "";
      const _value = logJson ? logJson[rawKind as keyof typeof logJson] : "";
      const value: LogValue =
        Array.isArray(_value) && _value.length === 2
          ? { data: _value[1], engine: _value[0] }
          : { data: _value };

      return createAndSaveLog(
        height,
        blockHash,
        i,
        kind,
        stringify(value),
        blockTimestamp
      );
    })
  );
}

export async function handleCall(_call: SubstrateExtrinsic): Promise<void> {
  const {
    idx,
    block: {
      timestamp,
      block: {
        header: { number, hash: blockHash },
      },
    },
    extrinsic: { method, hash, nonce, signer, signature, tip },
    success,
    events,
  } = _call;
  const methodToHuman = method.toHuman() as ExtrinsicHuman;
  const methodToPrimitive = method.toPrimitive() as ExtrinsicPrimitive;
  const eventRecord = events[idx];

  const feeEvent = events.find(
    (e) =>
      e.phase.isApplyExtrinsic &&
      e.event.section === "balances" &&
      e.event.method === "Withdraw"
  );
  const fee =
    feeEvent && feeEvent.event && feeEvent.event.data[1]
      ? BigInt(feeEvent.event.data[1].toString())
      : BigInt(0);

  const errorEvent = events.find(
    (e) => e.event.section === "system" && e.event.method === "ExtrinsicFailed"
  );
  const error = errorEvent ? stringify(errorEvent.event.data) : "";

  const pos = eventRecord
    ? eventRecord.phase.isApplyExtrinsic
      ? eventRecord.phase.asApplyExtrinsic.toNumber()
      : 0
    : 0;

  // Detect data storage extrinsics and parse args to cid
  let cid: string | undefined = undefined;
  let args: string = stringify(methodToPrimitive.args);
  if (
    (methodToHuman.section === "historySeeding" &&
      methodToHuman.method === "seedHistory") ||
    (methodToHuman.section === "system" &&
      (methodToHuman.method === "remarkWithEvent" ||
        methodToHuman.method === "remark"))
  ) {
    const parsedArgs = parseDataToCid(methodToPrimitive.args.remark);
    cid = parsedArgs.cid;
    // The args parameter will be replaced by `{ "cid": "bafkr6i..." }` to minimize the size of the db
    args = parsedArgs.modifiedArgs ?? stringify(methodToPrimitive.args);
  }

  await createAndSaveExtrinsic(
    hash.toString(),
    BigInt(number.toString()),
    blockHash.toString(),
    idx,
    methodToHuman.section,
    methodToHuman.method,
    success,
    timestamp ? timestamp : new Date(0),
    BigInt(nonce.toString()),
    signer.toString(),
    signature.toString(),
    args,
    error,
    BigInt(tip.toString()),
    fee,
    pos,
    cid
  );

  return await handleExtrinsic(_call);
}

export async function handleEvent(_event: SubstrateEvent): Promise<void> {
  const {
    idx,
    block: {
      block: {
        header: { number, hash },
      },
      timestamp,
      events,
    },
    extrinsic,
    event,
  } = _event;
  const primitive = event.toPrimitive() as EventPrimitive;
  const human = event.toHuman() as EventHuman;

  const eventRecord = events.find(
    (e) => e.event.index.toString() === primitive.index
  );
  const pos = eventRecord
    ? eventRecord.phase.isApplyExtrinsic
      ? eventRecord.phase.asApplyExtrinsic.toNumber()
      : 0
    : 0;
  const extrinsicId = extrinsic ? number + "-" + extrinsic.idx.toString() : "";
  const extrinsicHash = extrinsic ? extrinsic.extrinsic.hash.toString() : "";

  // Detect data storage extrinsics and parse args to cid
  let cid: string | undefined = undefined;
  let args: string = stringify(primitive.data);
  if (human.section === "system" && human.method === "Remarked") {
    const parsedArgs = parseDataToCid(primitive.data[1]);
    cid = parsedArgs.cid;
    // The args parameter will be replaced by `{ "cid": "bafkr6i..." }` to minimize the size of the db
    args = parsedArgs.modifiedArgs ?? stringify(primitive.data);
  }

  await createAndSaveEvent(
    BigInt(number.toString()),
    hash.toString(),
    BigInt(idx),
    extrinsicId,
    extrinsicHash,
    human.section,
    human.method,
    timestamp ? timestamp : new Date(0),
    eventRecord ? eventRecord.phase.type : "",
    pos,
    args,
    cid
  );

  switch (`${event.section}.${event.method}`) {
    case "balances.Transfer":
      return await handleTransferEvent(_event);
    case "rewards.VoteReward":
      return await handleFarmerVoteRewardEvent(_event);
    case "rewards.BlockReward":
      return await handleFarmerBlockRewardEvent(_event);
    default:
      break;
  }
}
