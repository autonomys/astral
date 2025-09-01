# Astral Staking Indexer - Implementation Gaps & Action Plan

## Overview

This document analyzes the current staking indexer implementation against the Astral Staking specification and identifies critical gaps that need to be addressed to properly display staking information in the Astral explorer.

## Current Implementation vs. Specification Gaps

| # | Area | Spec Requirement | Current Implementation | Gap/Problem |
|---|------|------------------|------------------------|-------------|
| 1 | **Operator-epoch share price** | On every epoch boundary, store `OperatorEpochSharePrice(operatorId, domainId, epoch, sharePrice, totals...)` to enable post-pending deposit/withdrawal evaluation | `detectEpochTransitions` finds boundaries, but we need to read the blocks to get the instant price for each operator | **CRITICAL**: No `OperatorEpochSharePrice` rows are written → impossible to convert pending deposits or withdrawals |
| 2 | **Deposit state tracking** | Track both `known` and `pending` parts of `domains.Deposits` struct. When epoch ends, lazily convert `pending` → `known` using share price at `pending.effectiveDomainEpoch` | Deposits only captured through events (`OperatorRegistered`/`OperatorNominated` → `DepositEvent`). On-chain state isn't queried, no entity exists for current positions | **CRITICAL**: Cannot compute Current Position, Staked Amount, Storage Fund, Total Reward |
| 3 | **Withdrawal state tracking** | Track `withdrawalInShares` and `withdrawals[]` list. Value = `shares * share_price + storageFeeRefund`. Use `instant_share_price` if epoch not ended | Optional query of `domains.withdrawals.entries()` exists but only stores raw objects. `WithdrewStake` handler estimates using current share price only | **HIGH**: No entity for outstanding withdrawals. Wrong withdrawal values (especially `withdrawalInShares`) |
| 4 | **Instant share price** | `instant_share_price = (operator.current_total_stake + taxed_reward) / current_total_shares` where `taxed_reward = currentEpochRewards[op] - nomination_tax * reward` | `OperatorStakingHistory.sharePrice` = `current_total_stake / current_total_shares` (ignores taxed reward). `DomainStakingSummary.currentEpochRewards` map never parsed | **MEDIUM**: Under-estimates share price within epoch → wrong pending withdrawal estimates |
| 5 | **Storage-fund account** | Needed to compute Storage Fund part of Current Position using `bundle_storage_fund_account.total_balance` | Only logs `storageFeeDeposit` from events. Derived account not stored | **MEDIUM**: Can't calculate nominator's storage-fund value |
| 6 | **GraphQL schema** | Must expose: `NominatorDeposit` (known, pending, post_pending), `NominatorWithdrawal` (withdrawalInShares, withdrawals list), `StorageFundAccount` balance | Only historical `DepositEvent`/`WithdrawEvent` present | **HIGH**: Front-end has to guess → displayed numbers are wrong |
| 7 | **Build issues** | Code should compile and run without errors | `utils.detectEpochTransitions()` uses `logger` without import | **LOW**: Build breaks due to missing import |

## Detailed Action Items

<!-- ### --- DONE --- 1. Fix Operator-Epoch Share Price Indexing ⚠️ **CRITICAL** 

**Problem**: The epoch transition detection exists but share price storage is commented out.

**Tasks**:
- [X] 1.1 api.query.domains.operatorEpochSharePrice(operatorId, [domainId, parentEpoch]) -> this is tricky! because this will return a value only there has a change towards the operator for example, the operator received a reward to nominator and etc. if there isn't any activity, it returns null.
**Code locations**:
- `indexers/staking/src/mappings/mappingHandlers.ts:120-140` (commented code)
- `indexers/staking/src/mappings/db.ts:448` (`createOperatorEpochSharePrice`) -->

<!-- ### 2. Create New GraphQL Entities ⚠️ **HIGH**

**Problem**: Current schema only has historical events, not current state.

**Tasks**:
- [ ] 2.1 Add to `schema.graphql`:
  ```graphql -- DONE
  type NominatorDeposit @entity {
    id: ID! # Format: accountId-domainId-operatorId
    accountId: String! @index
    operatorId: String! @index
    domainId: String! @index
    # Known deposit (from previous epochs)
    knownShares: BigInt!
    knownStorageFeeDeposit: BigInt!
    # Pending deposit (current epoch)
    pendingAmount: BigInt!
    pendingStorageFeeDeposit: BigInt!
    pendingEffectiveDomainEpoch: String # JSON: [domainId, epochIndex]
    # Post-pending (convertible pending)
    postPendingShares: BigInt!
    postPendingStorageFeeDeposit: BigInt!
    # Computed values
    stakedAmount: BigInt! # (known + post_pending) * instant_share_price
    storageFund: BigInt! # Proportional share of storage fund account
    totalReward: BigInt! # totalDeposit - stakedAmount - storageFund
    timestamp: Date!
    blockHeight: BigInt!
  }

  type NominatorWithdrawal @entity {
    id: ID! # Format: accountId-domainId-operatorId
    accountId: String! @index
    operatorId: String! @index
    domainId: String! @index
    # From withdrawalInShares
    withdrawalInSharesAmount: BigInt!
    withdrawalInSharesStorageFeeRefund: BigInt!
    withdrawalInSharesDomainEpoch: String # JSON: [domainId, epochIndex]
    withdrawalInSharesUnlockBlock: BigInt!
    # From withdrawals list
    totalWithdrawalAmount: BigInt!
    totalStorageFeeWithdrawal: BigInt!
    withdrawalsJson: String! # JSON array of withdrawal objects
    # Computed
    totalPendingWithdrawals: BigInt!
    timestamp: Date!
    blockHeight: BigInt!
  }

  type StorageFundAccount @entity {
    id: ID! # Format: operatorId
    operatorId: String! @index
    accountId: String! # Derived account address
    balance: BigInt!
    timestamp: Date!
    blockHeight: BigInt!
  }
  ``` -->

### 3. Index `domains.Deposits` State ⚠️ **CRITICAL**

**Problem**: Current positions are not tracked, only historical events.

**Tasks**:
- [ ] 3.1 Add conditional query in `handleBlock`:
  ```typescript
  if (extrinsics.some(e => e.method.section === "domains" && 
      ["nominateOperator", "registerOperator", "withdrawStake"].includes(e.method.method))) {
    query.push(api.query.domains.deposits.entries());
  }
  ```
- [ ] 3.2 Parse deposit entries to extract `known` and `pending` parts
- [ ] 3.3 Implement lazy conversion logic:
  ```typescript
  const sharePrice = findOperatorEpochSharePrice(operatorId, pending.effectiveDomainEpoch);
  if (sharePrice) {
    postPendingShares = pending.amount / sharePrice.sharePrice;
    postPendingStorage = pending.storageFeeDeposit;
  }
  ```
- [ ] 3.4 Create/update `NominatorDeposit` entities

**Code locations**:
- `indexers/staking/src/mappings/mappingHandlers.ts:50-60` (query section)

### 4. Index `domains.withdrawals` State ⚠️ **HIGH**

**Problem**: Withdrawal values calculated incorrectly, no entity for current withdrawals.

**Tasks**:
- [ ] 4.1 Enhance existing withdrawal query parsing
- [ ] 4.2 Implement correct `withdrawalInShares` valuation:
  ```typescript
  const sharePrice = findOperatorEpochSharePrice(operatorId, withdrawalInShares.domainEpoch) 
    ?? calculateInstantSharePrice(operatorId, domainId);
  const value = (withdrawalInShares.shares * sharePrice) / SHARES_CALCULATION_MULTIPLIER 
    + withdrawalInShares.storageFeeRefund;
  ```
- [ ] 4.3 Aggregate `withdrawals[]` list for totals
- [ ] 4.4 Create/update `NominatorWithdrawal` entities

**Code locations**:
- `indexers/staking/src/mappings/mappingHandlers.ts:70` (withdrawal query)
- `indexers/staking/src/mappings/eventHandler.ts:200-220` (`WithdrewStake` handler)

### 5. Implement Instant Share Price Helper ⚠️ **MEDIUM**

**Problem**: Share price calculation ignores current epoch rewards and nomination tax.

**Tasks**:
- [ ] 5.1 Parse `domainStakingSummary.currentEpochRewards` map
- [ ] 5.2 Implement helper function:
  ```typescript
  function calculateInstantSharePrice(operatorId: string, domainId: string): bigint {
    const operator = findOperatorFromCache(operatorId);
    const domainSummary = findDomainStakingSummary(domainId);
    
    const reward = domainSummary.currentEpochRewards.get(operatorId) ?? ZERO_BIGINT;
    const taxedReward = reward - (operator.nominationTax * reward);
    
    return (operator.currentTotalStake + taxedReward) / operator.currentTotalShares;
  }
  ```
- [ ] 5.3 Use in withdrawal valuation and pending deposit conversion

**Code locations**:
- `indexers/staking/src/mappings/mappingHandlers.ts:115` (domain staking summary parsing)

### 6. Track Storage Fund Accounts ⚠️ **MEDIUM**

**Problem**: Cannot calculate storage fund portion of Current Position.

**Tasks**:
- [ ] 6.1 Listen to `domains.StorageFeeDeposited` events to identify storage fund account addresses
- [ ] 6.2 Query account balances for identified storage fund accounts
- [ ] 6.3 Create/update `StorageFundAccount` entities
- [ ] 6.4 Implement proportional calculation:
  ```typescript
  const storageFund = (nominator.totalStorageFeeDeposit / operator.totalStorageFeeDeposit) 
    * storageFundAccount.balance;
  ```

### 7. Fix Import Issues ⚠️ **LOW**

**Problem**: Build fails due to missing logger import.

**Tasks**:
- [ ] 7.1 Add import to `utils.ts`: `import { logger } from '@subql/logger';`
- [ ] 7.2 Verify build passes

**Code locations**:
- `indexers/staking/src/mappings/utils.ts:1` (imports section)

### 8. Update Front-end Integration ⚠️ **HIGH**

**Problem**: Explorer displays incorrect staking information.

**Tasks**:
- [ ] 8.1 Update GraphQL queries to use new entities
- [ ] 8.2 Implement Current Position calculation:
  ```typescript
  const stakedAmount = (known.shares + postPending.shares) * instantSharePrice;
  const storageFund = (totalStorageDeposit / operatorTotalStorage) * bundleStorageFundBalance;
  const totalReward = totalDeposited - stakedAmount - storageFund;
  ```
- [ ] 8.3 Fix individual withdrawal amount display
- [ ] 8.4 Show pending vs. known deposit breakdown

### 9. Database Migration & Deployment ⚠️ **HIGH**

**Problem**: Schema changes require migration.

**Tasks**:
- [ ] 9.1 Bump `project.yaml` schema version
- [ ] 9.2 Generate new SubQuery project
- [ ] 9.3 Plan production database migration
- [ ] 9.4 Deploy updated indexer

### 10. Testing & Documentation ⚠️ **MEDIUM**

**Problem**: Complex logic needs thorough testing.

**Tasks**:
- [ ] 10.1 Create unit tests for:
  - Epoch transition detection
  - Share price calculations
  - Deposit/withdrawal state parsing
  - Post-pending conversion logic
- [ ] 10.2 Add integration test simulating full deposit → epoch transition → withdrawal flow
- [ ] 10.3 Update README with formulas and examples
- [ ] 10.4 Document new GraphQL schema

## Priority Implementation Order

1. **Phase 1 (Critical)**: Items 1, 2, 3 - Enable basic functionality
2. **Phase 2 (High Priority)**: Items 4, 6, 8 - Correct calculations
3. **Phase 3 (Remaining)**: Items 5, 7, 9, 10 - Polish and deploy

## Success Criteria

- [ ] Astral displays correct "Current Position" values matching manual calculations
- [ ] Individual withdrawal amounts are accurate (not showing duplicate high values)
- [ ] Pending deposits show correct conversion timeline
- [ ] Storage fund calculations work properly
- [ ] All tests pass and builds succeed

## References

- Original staking specification document
- `indexers/staking/src/mappings/mappingHandlers.ts` - Main indexing logic
- `indexers/staking/schema.graphql` - Current GraphQL schema
- `indexers/staking/src/mappings/eventHandler.ts` - Event processing 