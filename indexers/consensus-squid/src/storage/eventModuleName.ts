import { EventModuleName } from "../model";
import type { CtxBlock } from "../processor";
import { getBlockNumber } from "../utils";
import { Cache } from "../utils/cache";

export const createEventModuleName = (
  block: CtxBlock,
  id: string,
  props: Partial<EventModuleName> = {}
): EventModuleName => {
  const blockNumber = getBlockNumber(block);
  return new EventModuleName({
    id: id,
    name: "",
    createdAt: blockNumber,
    ...props,
  });
};

export const getOrCreateEventModuleName = (
  cache: Cache,
  block: CtxBlock,
  id: string,
  props: Partial<EventModuleName> = {}
): EventModuleName => {
  const eventModuleName = cache.eventModuleNames.get(id);

  if (!eventModuleName) return createEventModuleName(block, id, props);

  return eventModuleName;
};
