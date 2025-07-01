export type ExtrinsicPrimitive = {
  callIndex: string;
  args: any;
};

export interface SealedBundleHeader {
  header: BundleHeader;
}

interface BundleHeader {
  proofOfElection: ProofOfElection;
  receipt: ExecutionReceipt;
}

interface ProofOfElection {
  domainId: number;
  operatorId: bigint;
}

export interface ExecutionReceipt {
  domainBlockNumber: number;
  consensusBlockNumber: number;
}

export interface EpochTransition {
  domainId: string;
  parentEpoch: number;
  currentEpoch: number;
  parentSummary: any;
}
