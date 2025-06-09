export type ExtrinsicPrimitive = {
  callIndex: string;
  args: any;
};

export interface TBundle {
  sealedHeader: SealedBundleHeader;
  extrinsics: Uint8Array[];
}

export interface SealedBundleHeader {
  header: BundleHeader;
  signature: Uint8Array;
}

interface BundleHeader {
  proofOfElection: ProofOfElection;
  receipt: ExecutionReceipt;
  estimatedBundleWeight: Weight;
  bundleExtrinsicsRoot: Uint8Array;
}

interface ProofOfElection {
  domainId: number;
  slotNumber: bigint;
  proofOfTime: Uint8Array;
  vrfSignature: VrfSignature;
  operatorId: bigint;
  consensusBlockHash: Uint8Array;
}

export interface ExecutionReceipt {
  domainBlockNumber: number;
  domainBlockHash: Uint8Array;
  domainBlockExtrinsicRoot: Uint8Array;
  parentDomainBlockReceiptHash: Uint8Array;
  consensusBlockNumber: number;
  consensusBlockHash: Uint8Array;
  inboxedBundles: InboxedBundle[];
  finalStateRoot: Uint8Array;
  executionTrace: Uint8Array[];
  executionTraceRoot: Uint8Array;
  blockFees: BlockFees;
  transfers: Transfers;
}

interface VrfSignature {
  preOutput: Uint8Array;
  proof: Uint8Array;
}

interface Weight {
  refTime: bigint;
  proofSize: bigint;
}

interface InboxedBundle {
  bundle: BundleValidity;
  extrinsicsRoot: Uint8Array;
}

export type Transfer = {
  [key: string]: bigint;
};

interface Transfers {
  transfersIn: Transfer;
  transfersOut: Transfer;
  rejectedTransfersClaimed: Transfer;
  transfersRejected: Transfer;
}

interface BlockFees {
  consensusStorageFee: bigint;
  domainExecutionFee: bigint;
  burnedBalance: bigint;
}

type BundleValidity = BundleValidity_Invalid | BundleValidity_Valid;

interface BundleValidity_Invalid {
  __kind: "Invalid";
  value: InvalidBundleType;
}

interface BundleValidity_Valid {
  __kind: "Valid";
  value: Uint8Array;
}

type ChainId = ChainId_Consensus | ChainId_Domain;

interface ChainId_Consensus {
  __kind: "Consensus";
}

interface ChainId_Domain {
  __kind: "Domain";
  value: number;
}

type InvalidBundleType =
  | InvalidBundleType_UndecodableTx
  | InvalidBundleType_OutOfRangeTx
  | InvalidBundleType_IllegalTx
  | InvalidBundleType_InvalidXDM
  | InvalidBundleType_InherentExtrinsic;

interface InvalidBundleType_UndecodableTx {
  __kind: "UndecodableTx";
  value: number;
}

interface InvalidBundleType_OutOfRangeTx {
  __kind: "OutOfRangeTx";
  value: number;
}

interface InvalidBundleType_IllegalTx {
  __kind: "IllegalTx";
  value: number;
}

interface InvalidBundleType_InvalidXDM {
  __kind: "InvalidXDM";
  value: number;
}

interface InvalidBundleType_InherentExtrinsic {
  __kind: "InherentExtrinsic";
  value: number;
}

export interface EpochTransition {
  domainId: string;
  parentEpoch: number;
  currentEpoch: number;
}
