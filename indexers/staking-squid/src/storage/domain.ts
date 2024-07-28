import { Domain } from "../model";
import type { CtxBlock } from "../processor";
import { domainUID, getBlockNumber } from "../utils";
import { Cache } from "../utils/cache";

export const createDomain = (
  block: CtxBlock,
  domainId: number,
  props: Partial<Domain>
): Domain => {
  const domain = new Domain({
    id: domainUID(domainId),
    domainId,
    completedEpoch: 0,
    lastDomainBlockNumber: 0,
    currentTotalStake: BigInt(0),
    currentStorageFeeDeposit: BigInt(0),
    totalDeposits: BigInt(0),
    totalTaxCollected: BigInt(0),
    operators: [],
    nominators: [],
    deposits: [],
    withdrawals: [],
    operatorsCount: 0,
    nominatorsCount: 0,
    depositsCount: 0,
    withdrawalsCount: 0,
    bundleCount: 0,
    lastBundleAt: 0,
    ...props,
    createdAt: getBlockNumber(block),
    updatedAt: getBlockNumber(block),
  });

  return domain;
};

export const getOrCreateDomain = (
  cache: Cache,
  block: CtxBlock,
  domainId: number,
  props: Partial<Domain> = {}
): Domain => {
  const domain = cache.domains.get(domainUID(domainId));

  if (!domain) return createDomain(block, domainId, props);

  return domain;
};
