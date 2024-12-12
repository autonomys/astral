export type ExtrinsicPrimitive = {
  callIndex: string;
  args: any;
};

export type LogValue = {
  data: any;
  engine?: string;
};

export type Cid = string | undefined;
export type ModifiedArgs = string | undefined;

export type ParsedArgs = {
  cid: Cid;
  modifiedArgs: ModifiedArgs;
};
