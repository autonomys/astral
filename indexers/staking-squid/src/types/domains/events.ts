import { sts, Block, Bytes, Option, Result, EventType, RuntimeCtx } from '../support'
import * as v0 from '../v0'
import * as v1 from '../v1'
import * as v5 from '../v5'
import * as v6 from '../v6'

export const bundleStored = {
  name: 'Domains.BundleStored',
  /**
   * A domain bundle was included.
   */
  v0: new EventType(
    'Domains.BundleStored',
    sts.struct({
      domainId: v0.DomainId,
      bundleHash: v0.H256,
      bundleAuthor: sts.bigint(),
    }),
  ),
}

export const domainRuntimeCreated = {
  name: 'Domains.DomainRuntimeCreated',
  v0: new EventType(
    'Domains.DomainRuntimeCreated',
    sts.struct({
      runtimeId: sts.number(),
      runtimeType: v0.RuntimeType,
    }),
  ),
  v5: new EventType(
    'Domains.DomainRuntimeCreated',
    sts.struct({
      runtimeId: sts.number(),
      runtimeType: v5.RuntimeType,
    }),
  ),
}

export const domainRuntimeUpgradeScheduled = {
  name: 'Domains.DomainRuntimeUpgradeScheduled',
  v0: new EventType(
    'Domains.DomainRuntimeUpgradeScheduled',
    sts.struct({
      runtimeId: sts.number(),
      scheduledAt: sts.number(),
    }),
  ),
}

export const domainRuntimeUpgraded = {
  name: 'Domains.DomainRuntimeUpgraded',
  v0: new EventType(
    'Domains.DomainRuntimeUpgraded',
    sts.struct({
      runtimeId: sts.number(),
    }),
  ),
}

export const operatorRegistered = {
  name: 'Domains.OperatorRegistered',
  v0: new EventType(
    'Domains.OperatorRegistered',
    sts.struct({
      operatorId: sts.bigint(),
      domainId: v0.DomainId,
    }),
  ),
}

export const operatorNominated = {
  name: 'Domains.OperatorNominated',
  v0: new EventType(
    'Domains.OperatorNominated',
    sts.struct({
      operatorId: sts.bigint(),
      nominatorId: v0.AccountId32,
    }),
  ),
  v6: new EventType(
    'Domains.OperatorNominated',
    sts.struct({
      operatorId: sts.bigint(),
      nominatorId: v6.AccountId32,
      amount: sts.bigint(),
    }),
  ),
}

export const domainInstantiated = {
  name: 'Domains.DomainInstantiated',
  v0: new EventType(
    'Domains.DomainInstantiated',
    sts.struct({
      domainId: v0.DomainId,
    }),
  ),
}

export const operatorSwitchedDomain = {
  name: 'Domains.OperatorSwitchedDomain',
  v0: new EventType(
    'Domains.OperatorSwitchedDomain',
    sts.struct({
      oldDomainId: v0.DomainId,
      newDomainId: v0.DomainId,
    }),
  ),
}

export const operatorDeregistered = {
  name: 'Domains.OperatorDeregistered',
  v0: new EventType(
    'Domains.OperatorDeregistered',
    sts.struct({
      operatorId: sts.bigint(),
    }),
  ),
}

export const operatorUnlocked = {
  name: 'Domains.OperatorUnlocked',
  v0: new EventType(
    'Domains.OperatorUnlocked',
    sts.struct({
      operatorId: sts.bigint(),
    }),
  ),
}

export const withdrewStake = {
  name: 'Domains.WithdrewStake',
  v0: new EventType(
    'Domains.WithdrewStake',
    sts.struct({
      operatorId: sts.bigint(),
      nominatorId: v0.AccountId32,
    }),
  ),
}

export const fundsUnlocked = {
  name: 'Domains.FundsUnlocked',
  v0: new EventType(
    'Domains.FundsUnlocked',
    sts.struct({
      operatorId: sts.bigint(),
      nominatorId: v0.AccountId32,
      amount: sts.bigint(),
    }),
  ),
}

export const preferredOperator = {
  name: 'Domains.PreferredOperator',
  v0: new EventType(
    'Domains.PreferredOperator',
    sts.struct({
      operatorId: sts.bigint(),
      nominatorId: v0.AccountId32,
    }),
  ),
}

export const operatorRewarded = {
  name: 'Domains.OperatorRewarded',
  v0: new EventType(
    'Domains.OperatorRewarded',
    sts.struct({
      operatorId: sts.bigint(),
      reward: sts.bigint(),
    }),
  ),
}

export const operatorTaxCollected = {
  name: 'Domains.OperatorTaxCollected',
  v0: new EventType(
    'Domains.OperatorTaxCollected',
    sts.struct({
      operatorId: sts.bigint(),
      tax: sts.bigint(),
    }),
  ),
}

export const domainEpochCompleted = {
  name: 'Domains.DomainEpochCompleted',
  v0: new EventType(
    'Domains.DomainEpochCompleted',
    sts.struct({
      domainId: v0.DomainId,
      completedEpochIndex: sts.number(),
    }),
  ),
}

export const forceDomainEpochTransition = {
  name: 'Domains.ForceDomainEpochTransition',
  v0: new EventType(
    'Domains.ForceDomainEpochTransition',
    sts.struct({
      domainId: v0.DomainId,
      completedEpochIndex: sts.number(),
    }),
  ),
}

export const fraudProofProcessed = {
  name: 'Domains.FraudProofProcessed',
  v0: new EventType(
    'Domains.FraudProofProcessed',
    sts.struct({
      domainId: v0.DomainId,
      newHeadReceiptNumber: sts.option(() => sts.number()),
    }),
  ),
}

export const domainOperatorAllowListUpdated = {
  name: 'Domains.DomainOperatorAllowListUpdated',
  v0: new EventType(
    'Domains.DomainOperatorAllowListUpdated',
    sts.struct({
      domainId: v0.DomainId,
    }),
  ),
}

export const operatorSlashed = {
  name: 'Domains.OperatorSlashed',
  v0: new EventType(
    'Domains.OperatorSlashed',
    sts.struct({
      operatorId: sts.bigint(),
      reason: v0.SlashedReason,
    }),
  ),
  v5: new EventType(
    'Domains.OperatorSlashed',
    sts.struct({
      operatorId: sts.bigint(),
      reason: v5.SlashedReason,
    }),
  ),
}

export const storageFeeDeposited = {
  name: 'Domains.StorageFeeDeposited',
  v1: new EventType(
    'Domains.StorageFeeDeposited',
    sts.struct({
      operatorId: sts.bigint(),
      nominatorId: v1.AccountId32,
      amount: sts.bigint(),
    }),
  ),
}

export const nominatedStakedUnlocked = {
  name: 'Domains.NominatedStakedUnlocked',
  v6: new EventType(
    'Domains.NominatedStakedUnlocked',
    sts.struct({
      operatorId: sts.bigint(),
      nominatorId: v6.AccountId32,
      unlockedAmount: sts.bigint(),
    }),
  ),
}

export const storageFeeUnlocked = {
  name: 'Domains.StorageFeeUnlocked',
  v6: new EventType(
    'Domains.StorageFeeUnlocked',
    sts.struct({
      operatorId: sts.bigint(),
      nominatorId: v6.AccountId32,
      storageFee: sts.bigint(),
    }),
  ),
}

export const nominatorUnlocked = {
  name: 'Domains.NominatorUnlocked',
  v6: new EventType(
    'Domains.NominatorUnlocked',
    sts.struct({
      operatorId: sts.bigint(),
      nominatorId: v6.AccountId32,
    }),
  ),
}

export const domainFrozen = {
  name: 'Domains.DomainFrozen',
  v6: new EventType(
    'Domains.DomainFrozen',
    sts.struct({
      domainId: v6.DomainId,
    }),
  ),
}

export const domainUnfrozen = {
  name: 'Domains.DomainUnfrozen',
  v6: new EventType(
    'Domains.DomainUnfrozen',
    sts.struct({
      domainId: v6.DomainId,
    }),
  ),
}

export const prunedExecutionReceipt = {
  name: 'Domains.PrunedExecutionReceipt',
  v6: new EventType(
    'Domains.PrunedExecutionReceipt',
    sts.struct({
      domainId: v6.DomainId,
      newHeadReceiptNumber: sts.option(() => sts.number()),
    }),
  ),
}
