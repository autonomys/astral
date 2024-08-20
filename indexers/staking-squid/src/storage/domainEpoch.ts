import { DomainEpoch } from "../model";
import { CtxBlock } from "../processor";
import { epochUID, getBlockNumber, getTimestamp } from "../utils";
import { Cache } from "../utils/cache";

export const createDomainEpoch = (
  block: CtxBlock,
  domainId: string,
  epoch: number,
  props?: Partial<DomainEpoch>
): DomainEpoch =>
  new DomainEpoch({
    id: epochUID(domainId, epoch),
    domainId,
    epoch,
    blockNumberStart: 0,
    blockNumberEnd: 0,
    timestampStart: getTimestamp(block),
    timestampEnd: getTimestamp(block),
    consensusBlockNumberStart: 0,
    consensusBlockNumberEnd: 0,
    consensusBlockHashStart: "",
    consensusBlockHashEnd: "",
    createdAt: getBlockNumber(block),
    updatedAt: getBlockNumber(block),
    ...props,
  });

export const getOrCreateDomainEpoch = (
  cache: Cache,
  block: CtxBlock,
  domainId: string,
  props: Partial<DomainEpoch> = {}
): DomainEpoch => {
  const epoch = cache.domains.get(domainId)?.completedEpoch ?? 0;

  const domainEpoch = cache.domainEpochs.get(epochUID(domainId, epoch));

  if (!domainEpoch) return createDomainEpoch(block, domainId, epoch, props);

  return domainEpoch;
};
