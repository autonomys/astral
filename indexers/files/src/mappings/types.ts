export type ExtrinsicPrimitive = {
  callIndex: string;
  args: any;
};

export type ExtrinsicHuman = ExtrinsicPrimitive & {
  method: string;
  section: string;
};
