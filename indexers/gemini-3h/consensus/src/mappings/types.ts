type ExtrinsicPrimitive = {
  callIndex: string;
  args: any;
};

export type ExtrinsicHuman = ExtrinsicPrimitive & {
  method: string;
  section: string;
};

export type EventPrimitive = {
  index: string;
  data: any;
};

export type EventHuman = EventPrimitive & {
  method: string;
  section: string;
};
