import { DomainBlock } from "../model";
import { CtxBlock } from "../processor";
import { blockUID, getBlockNumber, getTimestamp } from "../utils";

export const createDomainBlock = (
  block: CtxBlock,
  domainId: string,
  blockNumber: number,
  blockHash: string,
  props?: Partial<DomainBlock>
): DomainBlock =>
  new DomainBlock({
    id: blockUID(domainId, blockNumber),
    domainId,
    blockNumber,
    blockHash,
    extrinsicRoot: "",
    epoch: 0,
    consensusBlockNumber: 0,
    consensusBlockHash: "",
    createdAt: getBlockNumber(block),
    updatedAt: getBlockNumber(block),
    timestamp: getTimestamp(block),
    ...props,
  });
