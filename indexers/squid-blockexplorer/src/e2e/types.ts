export interface AccountBalance {
  total: number;
  free: number;
  reserved: number;
  updatedAt: number;
}

export interface SquidStatusResponse {
  squidStatus: {
    height: number;
  };
}

export interface AccountBalanceResponse {
  accountById: AccountBalance;
}

interface Block {
  hash: string;
  height: string;
  id: string;
  parentHash: string;
  spacePledged: string;
  specId: string;
  stateRoot: string;
  logs: unknown[]
}

export interface BlocksResponse {
  blocks: Block[];
}

interface Extrinsic {
  hash: string;
  name: string;
}

export interface ExtrinsicsResponse {
  extrinsics: Extrinsic[];
}

export interface EventsResponse {
  events: { name: string }[];
}
