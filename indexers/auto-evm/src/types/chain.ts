export interface BlockLog {
  preRuntime?: [string, string];
  consensus?: [string, string];
  seal?: [string, string];
}

export interface BlockDigest {
  logs: BlockLog[];
}

export interface Block {
  hash: string;
  parentHash: string;
  number: number;
  stateRoot: string;
  extrinsicsRoot: string;
  digest: BlockDigest;
}

export type LogValue = [string, string];

export type Log = {
  [key: string]: LogValue;
};

export type Digest = {
  logs: Log[];
};

export type EventPhase =
  | { applyExtrinsic: number }
  | { finalization: number }
  | { initialization: number };

export interface Event {
  phase: EventPhase;
  event: {
    method: string;
    section: string;
    index: string;
    data: any;
  };
  topics: Array<any>;
}

export type Extrinsic = {
  hash: string;
  isSigned: boolean;
  section: string;
  method: string;
  signer: string;
  signature: {
    [signatureType: string]: string;
  };
  callIndex: number;
  args: object;
  nonce: bigint;
  tip: bigint;
};
