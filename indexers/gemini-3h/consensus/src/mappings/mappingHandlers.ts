import {
  SubstrateBlock,
  SubstrateEvent,
  SubstrateExtrinsic,
} from "@subql/types";
import {
  createAndSaveBlock,
  createAndSaveEvent,
  createAndSaveExtrinsic,
  prepareLog,
  saveLog,
} from "./db";
import { getBlockAuthor } from "./helper";
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

  // Get block author
  const authorId = getBlockAuthor(_block);

  // To-Do:
  const spacePledged = BigInt(0);
  const blockchainSize = BigInt(0);

  const eventsCount = events.length;
  const extrinsicsCount = extrinsics.length;

  // Create block
  await createAndSaveBlock(
    blockHash,
    height,
    timestamp ? timestamp : new Date(0),
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
  const _logs = digest.logs.map((log, i) => {
    const logData = log.toHuman();
    const logJson = log.toPrimitive();
    const kind = logData ? Object.keys(logData)[0] : "";
    const rawKind = logJson ? Object.keys(logJson)[0] : "";
    const value = logJson
      ? stringify(logJson[rawKind as keyof typeof logJson])
      : "";
    const logObj = prepareLog(height, blockHash, i, rawKind, kind, value);
    return logObj;
  });
  await saveLog(_logs);
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
  } = _call;

  const extrinsic_human = method.toHuman() as ExtrinsicHuman;
  const extrinsic_primitive = method.toPrimitive() as ExtrinsicPrimitive;

  const error = "";
  const fee = BigInt(0);
  const pos = 0;

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
    },
    extrinsic,
    event,
  } = _event;

  const primitive = event.toPrimitive() as EventPrimitive;
  const human = event.toHuman() as EventHuman;

  const timestamp = new Date(0); // Default value
  const phase = ""; // Placeholder for phase
  const pos = 0;
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
    timestamp,
    phase,
    pos,
    args
  );
}
