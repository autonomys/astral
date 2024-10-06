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
import {
  calculateBlockchainSize,
  calculateSpacePledged,
  getBlockAuthor,
} from "./helper";
import { stringify } from "./utils";

type ExtrinsicPrimitive = {
  callIndex: string;
  args: any;
};

type ExtrinsicHuman = ExtrinsicPrimitive & {
  method: string;
  section: string;
};

type EventPrimitive = {
  index: string;
  data: any;
};

type EventHuman = EventPrimitive & {
  method: string;
  section: string;
};

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
  const [spacePledged, blockchainSize] = await Promise.all([
    calculateSpacePledged(),
    calculateBlockchainSize(),
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
    spacePledged,
    blockchainSize,
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
      const value = logJson
        ? stringify(logJson[rawKind as keyof typeof logJson])
        : "";
      return createAndSaveLog(
        height,
        blockHash,
        i,
        rawKind,
        kind,
        value,
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
        header: { number },
      },
    },
    extrinsic: { method, hash, nonce, signer, signature, tip, args },
    success,
    events,
  } = _call;

  const extrinsic_human = method.toHuman() as ExtrinsicHuman;
  const extrinsic_primitive = method.toPrimitive() as ExtrinsicPrimitive;
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

  await createAndSaveExtrinsic(
    hash.toString(),
    BigInt(number.toString()),
    hash.toString(),
    idx,
    extrinsic_primitive.callIndex,
    extrinsic_human.section,
    extrinsic_human.method,
    success,
    timestamp ? timestamp : new Date(0),
    BigInt(nonce.toString()),
    signer.toString(),
    signature.toString(),
    stringify(args),
    error,
    BigInt(tip.toString()),
    fee,
    pos
  );
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
  const args = extrinsic ? stringify(extrinsic.extrinsic.args) : "";
  const extrinsicId = extrinsic
    ? number + "-" + extrinsic.extrinsic.hash.toString()
    : "";
  const extrinsicHash = extrinsic ? extrinsic.extrinsic.hash.toString() : "";

  await createAndSaveEvent(
    BigInt(number.toString()),
    hash.toString(),
    BigInt(idx),
    extrinsicId,
    extrinsicHash,
    primitive.index,
    human.section,
    human.method,
    timestamp ? timestamp : new Date(0),
    eventRecord ? eventRecord.phase.type : "",
    pos,
    args
  );
}
