import { z } from "zod";

const BlockLogSchema = z.object({
  preRuntime: z.tuple([z.string(), z.string()]).optional(),
  consensus: z.tuple([z.string(), z.string()]).optional(),
  seal: z.tuple([z.string(), z.string()]).optional(),
});

const BlockDigestSchema = z.object({
  logs: z.array(BlockLogSchema),
});

export const BlockSchema = z.object({
  hash: z.string(),
  parentHash: z.string(),
  number: z.number(),
  stateRoot: z.string(),
  extrinsicsRoot: z.string(),
  digest: BlockDigestSchema,
});
