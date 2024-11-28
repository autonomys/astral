import useWallet from 'hooks/useWallet'
import { useCallback, useEffect, useState } from 'react'
import { useConsensusStates } from 'states/consensus'
import {
  ConfirmedDomainExecutionReceipt,
  DomainRegistry,
  DomainStakingSummary,
  PendingStakingOperationCount,
  SuccessfulBundle,
} from 'types/consensus'
import { formatDeposits, formatOperators, formatWithdrawals } from 'utils/chainStateParsing'

export const useConsensusData = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const {
    setProperties,
    setDomain,
    setSystem,
    setDomainRegistry,
    setDomainStakingSummary,
    setLatestConfirmedDomainExecutionReceipt,
    setNominatorCount,
    setOperatorIdOwner,
    setOperators,
    setPendingStakingOperationCount,
    setSuccessfulBundles,
    setDeposits,
    setWithdrawals,
  } = useConsensusStates()
  const { api } = useWallet()

  const loadData = useCallback(async () => {
    if (!api || isLoading || isLoaded) return
    setIsLoading(true)
    try {
      const [
        properties,
        domains,
        // system
        chain,
        name,
        // domains
        domainRegistry,
        domainStakingSummary,
        latestConfirmedDomainExecutionReceipt,
        nominatorCount,
        operatorIdOwner,
        operators,
        pendingStakingOperationCount,
        successfulBundles,
      ] = await Promise.all([
        api.rpc.system.properties(),
        api.consts.domains,
        // system
        api.rpc.system.chain(),
        api.rpc.system.name(),
        // domains
        api.query.domains.domainRegistry.entries(),
        api.query.domains.domainStakingSummary.entries(),
        api.query.domains.latestConfirmedDomainExecutionReceipt.entries(),
        api.query.domains.nominatorCount.entries(),
        api.query.domains.operatorIdOwner.entries(),
        api.query.domains.operators.entries(),
        api.query.domains.pendingStakingOperationCount.entries(),
        api.query.domains.successfulBundles.entries(),
      ])

      setProperties({
        ss58Format: (properties.ss58Format.toPrimitive() as number[])[0],
        tokenDecimals: (properties.tokenDecimals.toPrimitive() as number[])[0],
        tokenSymbol: (properties.tokenSymbol.toJSON() as string[])[0],
        // domainsBootstrapNodes: (properties.domainsBootstrapNodes.toJSON() as string[])[0]
      })
      setDomain({
        confirmationDepthK: domains.confirmationDepthK.toHuman() as string,
        domainRuntimeUpgradeDelay: domains.domainRuntimeUpgradeDelay.toHuman() as string,
        blockTreePruningDepth: domains.blockTreePruningDepth.toHuman() as string,
        consensusSlotProbability: domains.consensusSlotProbability.toHuman() as string,
        maxDomainBlockSize: domains.maxDomainBlockSize.toHuman() as string,
        maxDomainBlockWeight: domains.maxDomainBlockWeight.toHuman() as {
          refTime: number
          proofSize: number
        },
        maxBundlesPerBlock: domains.maxBundlesPerBlock.toHuman() as string,
        maxDomainNameLength: domains.maxDomainNameLength.toHuman() as string,
        domainInstantiationDeposit: domains.domainInstantiationDeposit.toHuman() as string,
        initialDomainTxRange: domains.initialDomainTxRange.toHuman() as string,
        domainTxRangeAdjustmentInterval:
          domains.domainTxRangeAdjustmentInterval.toHuman() as string,
        minOperatorStake: domains.minOperatorStake.toJSON() as string,
        minNominatorStake: domains.minNominatorStake.toJSON() as string,
        stakeWithdrawalLockingPeriod: domains.stakeWithdrawalLockingPeriod.toJSON() as string,
        stakeEpochDuration: domains.stakeEpochDuration.toJSON() as string,
        treasuryAccount: domains.treasuryAccount.toHuman() as string,
        maxPendingStakingOperation: domains.maxPendingStakingOperation.toHuman() as number,
        palletId: domains.palletId.toHuman() as string,
        bundleLongevity: domains.bundleLongevity.toHuman() as string,
      })
      setSystem({ chain: chain.toHuman(), name: name.toHuman() })
      setDomainRegistry(
        domainRegistry.map((domain) => {
          return {
            domainId: (domain[0].toHuman() as string[])[0],
            ...(domain[1].toJSON() as Omit<DomainRegistry, 'domainId'>),
          }
        }),
      )
      setDomainStakingSummary(
        domainStakingSummary.map((domain) => domain[1].toJSON() as DomainStakingSummary),
      )
      setLatestConfirmedDomainExecutionReceipt(
        latestConfirmedDomainExecutionReceipt.map((domainBlock) => ({
          id: parseInt((domainBlock[0].toHuman() as string[])[0]),
          ...(domainBlock[1].toJSON() as Omit<ConfirmedDomainExecutionReceipt, 'id'>),
        })),
      )
      setNominatorCount(
        nominatorCount.map((nominator) => ({
          id: parseInt((nominator[0].toHuman() as string[])[0]),
          count: nominator[1].toHuman() as number,
        })),
      )
      setOperatorIdOwner(
        operatorIdOwner.map((operator) => ({
          id: parseInt((operator[0].toHuman() as string[])[0]),
          owner: operator[1].toJSON() as string,
        })),
      )
      const formattedOperators = formatOperators(operators, operatorIdOwner)
      setOperators(formattedOperators)
      setPendingStakingOperationCount(
        pendingStakingOperationCount.map(
          (stakingOp) =>
            ({
              id: parseInt((stakingOp[0].toHuman() as string[])[0]),
              count: stakingOp[1].toJSON(),
            }) as PendingStakingOperationCount,
        ),
      )
      setSuccessfulBundles(
        successfulBundles.map(
          (bundle) =>
            ({
              id: parseInt((bundle[0].toHuman() as string[])[0]),
              bundle: bundle[1].toHuman(),
            }) as SuccessfulBundle,
        ),
      )

      const deposits = await Promise.all(
        formattedOperators.map((o) => api.query.domains.deposits.entries(o.id)),
      )
      const withdrawals = await Promise.all(
        formattedOperators.map((o) => api.query.domains.withdrawals.entries(o.id)),
      )
      setDeposits(formatDeposits(deposits.flat()))
      setWithdrawals(formatWithdrawals(withdrawals.flat()))
      setIsLoaded(true)
      setIsLoading(false)
    } catch (error) {
      console.error('useConsensusData', error)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [api])

  const loadDataByOperatorId = useCallback(
    async (operatorId: string) => {
      if (!api) return

      try {
        const [deposits, withdrawals] = await Promise.all([
          api.query.domains.deposits.entries(operatorId),
          api.query.domains.withdrawals.entries(operatorId),
        ])
        setDeposits(formatDeposits(deposits))
        setWithdrawals(formatWithdrawals(withdrawals))
      } catch (error) {
        console.error('useConsensusData', error)
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [api],
  )

  useEffect(() => {
    if (!isLoaded) loadData()
  }, [isLoaded, loadData])

  return { loadData, loadDataByOperatorId }
}
