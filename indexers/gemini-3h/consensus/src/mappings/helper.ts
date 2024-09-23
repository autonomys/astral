import { SubstrateBlock } from "@subql/types";
import { decodeLog } from "./utils";

const DEFAULT_ACCOUNT_ID = "0x00";

const PIECE_SIZE = BigInt(1048576);

export const getBlockAuthor = (block: SubstrateBlock): string => {
  const { digest } = block.block.header;
  const preRuntimeRaw = digest.logs.find((digestI) => digestI.isPreRuntime);
  if (preRuntimeRaw) {
    const value = decodeLog(preRuntimeRaw.asPreRuntime);
    if (value) {
      api.registry.register({
        Solution: {
          public_key: "AccountId32",
          reward_address: "AccountId32",
        },
        SubPreDigest: {
          slot: "u64",
          solution: "Solution",
        },
      });
      const type = api.registry.createType("SubPreDigest", value.data);
      const publicKey = (type.toPrimitive() as any).solution.public_key;
      const rewardAddress = (type.toPrimitive() as any).solution.reward_address;
      return rewardAddress;
    }
  }
  return DEFAULT_ACCOUNT_ID;
};

export function solutionRangeToSectors(
  solutionRange: bigint,
  slotProbability: [bigint, bigint],
  piecesInSector: bigint
): bigint {
  const MAX_U64 = BigInt(2 ** 64 - 1);
  const RECORD_NUM_CHUNKS = BigInt(32768);
  const RECORD_NUM_S_BUCKETS = BigInt(65536);

  const sectors =
    ((MAX_U64 / slotProbability[1]) * slotProbability[0]) /
    ((piecesInSector * RECORD_NUM_CHUNKS) / RECORD_NUM_S_BUCKETS);

  return sectors / solutionRange;
}

export const calculateSpacePledged = async (): Promise<bigint> => {
  const subspaceSolutionRanges = await api.query.subspace.solutionRanges();

  const solutionRanges = subspaceSolutionRanges.toPrimitive() as {
    current: string;
    next: string | null;
    votingCurrent: string;
    votingNext: string | null;
  };
  const _slotProbability =
    api.consts.subspace.slotProbability.toPrimitive() as [number, number];
  const slotProbability: [bigint, bigint] = [
    BigInt(_slotProbability[0]),
    BigInt(_slotProbability[1]),
  ];

  const maxPiecesInSector = BigInt(
    api.consts.subspace.maxPiecesInSector.toPrimitive()?.toString() ?? "0"
  );

  const currentSolutionRange = BigInt(solutionRanges.current);

  const sectors = solutionRangeToSectors(
    currentSolutionRange,
    slotProbability,
    maxPiecesInSector
  );
  const totalSpacePledged = sectors * maxPiecesInSector * PIECE_SIZE;

  return totalSpacePledged;
};

export const calculateBlockchainSize = async (): Promise<bigint> => {
  const segmentCommitment =
    await api.query.subspace.segmentCommitment.entries();
  const segmentsCount = BigInt(segmentCommitment.length);

  const blockchainSize = PIECE_SIZE * BigInt(256) * segmentsCount;
  return blockchainSize;
};
