import { DomainEpoch } from "../model";
import { CtxBlock } from "../processor";
import { blockUID, getBlockNumber, getTimestamp } from "../utils";

export const createDomainEpoch = (
  block: CtxBlock,
  domainId: string,
  epoch: number,
  blockNumberStart: number,
  consensusBlockNumberStart: number,
  consensusBlockHashStart: string,
  props?: Partial<DomainEpoch>
): DomainEpoch =>
  new DomainEpoch({
    id: blockUID(domainId, epoch),
    domainId,
    epoch,
    blockNumberStart,
    blockNumberEnd: 0,
    timestampStart: getTimestamp(block),
    timestampEnd: getTimestamp(block),
    consensusBlockNumberStart,
    consensusBlockNumberEnd: 0,
    consensusBlockHashStart,
    consensusBlockHashEnd: "",
    createdAt: getBlockNumber(block),
    updatedAt: getBlockNumber(block),
    ...props,
  });
