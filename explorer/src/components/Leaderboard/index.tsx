'use client'

import { PageTabs } from 'components/common/PageTabs'
import { Tab } from 'components/common/Tabs'
import { INTERNAL_ROUTES, Routes } from 'constants/routes'
import {
  AccountExtrinsicFailedTotalCountDocument,
  AccountExtrinsicSuccessTotalCountDocument,
  AccountExtrinsicTotalCountDocument,
  AccountRemarkCountDocument,
  AccountTransactionFeePaidTotalValueDocument,
  AccountTransferReceiverTotalCountDocument,
  AccountTransferReceiverTotalValueDocument,
  AccountTransferSenderTotalCountDocument,
  AccountTransferSenderTotalValueDocument,
  FarmerBlockTotalCountDocument,
  FarmerBlockTotalValueDocument,
  FarmerVoteAndBlockTotalCountDocument,
  FarmerVoteAndBlockTotalValueDocument,
  FarmerVoteTotalCountDocument,
  FarmerVoteTotalValueDocument,
  NominatorDepositsTotalCountDocument,
  NominatorDepositsTotalValueDocument,
  NominatorWithdrawalsTotalCountDocument,
  OperatorBundleTotalCountDocument,
  OperatorDepositsTotalCountDocument,
  OperatorDepositsTotalValueDocument,
  OperatorTotalRewardsCollectedDocument,
  OperatorTotalTaxCollectedDocument,
  OperatorWithdrawalsTotalCountDocument,
} from 'gql/graphql'
import useIndexers from 'hooks/useIndexers'
import useMediaQuery from 'hooks/useMediaQuery'
import useWallet from 'hooks/useWallet'
import React, { FC } from 'react'
import { useTableSettings } from 'states/tables'
import type { LeaderboardFilters } from 'types/table'
import { MyPositionSwitch } from '../common/MyPositionSwitch'
import { TableSettings } from '../common/TableSettings'
import { LeaderboardList } from './LeaderboardList'

type LeaderboardProps = {
  children: React.ReactNode
}
const TABLE = 'leaderboard'

const Leaderboard: FC<LeaderboardProps> = ({ children }) => {
  const { subspaceAccount } = useWallet()
  const { filters } = useTableSettings<LeaderboardFilters>(TABLE)

  return (
    <div className='flex w-full flex-col space-y-6'>
      <TableSettings
        table={TABLE}
        filters={filters}
        addExtraIcons={
          subspaceAccount && (
            <div className='w-40'>
              <MyPositionSwitch labels={['My rank', 'All']} />
            </div>
          )
        }
      />
      {children}
    </div>
  )
}

export const AccountLeaderboard: FC = () => {
  const isDesktop = useMediaQuery('(min-width: 640px)')
  const { network, tokenSymbol } = useIndexers()

  return (
    <Leaderboard>
      <PageTabs pillStyle='py-2' activePillStyle='py-2' isDesktop={isDesktop} tabTitleStyle='gap-2'>
        <Tab title='Extrinsic Count'>
          <LeaderboardList
            query={AccountExtrinsicTotalCountDocument}
            table='leaderboard_account_extrinsic_total_counts'
            idLink={(id) => INTERNAL_ROUTES.accounts.id.page(network, Routes.consensus, id)}
            valueType='number'
          />
        </Tab>
        <Tab title='Extrinsic Success Count'>
          <LeaderboardList
            query={AccountExtrinsicSuccessTotalCountDocument}
            table='leaderboard_account_extrinsic_success_total_counts'
            idLink={(id) => INTERNAL_ROUTES.accounts.id.page(network, Routes.consensus, id)}
            valueType='number'
          />
        </Tab>
        <Tab title='Extrinsic Failed Count'>
          <LeaderboardList
            query={AccountExtrinsicFailedTotalCountDocument}
            table='leaderboard_account_extrinsic_failed_total_counts'
            idLink={(id) => INTERNAL_ROUTES.accounts.id.page(network, Routes.consensus, id)}
            valueType='number'
          />
        </Tab>
        <Tab title='Transaction Fee Paid Value'>
          <LeaderboardList
            query={AccountTransactionFeePaidTotalValueDocument}
            table='leaderboard_account_transaction_fee_paid_total_values'
            idLink={(id) => INTERNAL_ROUTES.accounts.id.page(network, Routes.consensus, id)}
            valueLabel='Total fee paid'
            valueSuffix={tokenSymbol}
          />
        </Tab>
        <Tab title='Transfer Sender Count'>
          <LeaderboardList
            query={AccountTransferSenderTotalCountDocument}
            table='leaderboard_account_transfer_sender_total_counts'
            idLink={(id) => INTERNAL_ROUTES.accounts.id.page(network, Routes.consensus, id)}
            valueType='number'
          />
        </Tab>
        <Tab title='Transfer Sender Value'>
          <LeaderboardList
            query={AccountTransferSenderTotalValueDocument}
            table='leaderboard_account_transfer_sender_total_values'
            idLink={(id) => INTERNAL_ROUTES.accounts.id.page(network, Routes.consensus, id)}
            valueLabel='Total sent'
            valueSuffix={tokenSymbol}
          />
        </Tab>
        <Tab title='Transfer Receiver Count'>
          <LeaderboardList
            query={AccountTransferReceiverTotalCountDocument}
            table='leaderboard_account_transfer_receiver_total_counts'
            idLink={(id) => INTERNAL_ROUTES.accounts.id.page(network, Routes.consensus, id)}
            valueType='number'
          />
        </Tab>
        <Tab title='Transfer Receiver Value'>
          <LeaderboardList
            query={AccountTransferReceiverTotalValueDocument}
            table='leaderboard_account_transfer_receiver_total_values'
            idLink={(id) => INTERNAL_ROUTES.accounts.id.page(network, Routes.consensus, id)}
            valueLabel='Total received'
            valueSuffix={tokenSymbol}
          />
        </Tab>
        <Tab title='Remark Count'>
          <LeaderboardList
            query={AccountRemarkCountDocument}
            table='leaderboard_account_remark_counts'
            idLink={(id) => INTERNAL_ROUTES.accounts.id.page(network, Routes.consensus, id)}
            valueType='number'
          />
        </Tab>
      </PageTabs>
    </Leaderboard>
  )
}

export const FarmerLeaderboard: FC = () => {
  const isDesktop = useMediaQuery('(min-width: 640px)')
  const { network, tokenSymbol } = useIndexers()

  return (
    <Leaderboard>
      <PageTabs
        isDesktop={isDesktop}
        activePillStyle='py-2'
        pillStyle='py-2'
        tabStyle='py-2'
        tabTitleStyle='py-2'
      >
        <Tab title='Vote & Block Count'>
          <LeaderboardList
            query={FarmerVoteAndBlockTotalCountDocument}
            table='leaderboard_farmer_vote_and_block_total_counts'
            idLabel='Farmer'
            idLink={(id) => INTERNAL_ROUTES.accounts.id.page(network, Routes.consensus, id)}
            valueType='number'
          />
        </Tab>
        <Tab title='Vote & Block Value'>
          <LeaderboardList
            query={FarmerVoteAndBlockTotalValueDocument}
            table='leaderboard_farmer_vote_and_block_total_values'
            idLabel='Farmer'
            idLink={(id) => INTERNAL_ROUTES.accounts.id.page(network, Routes.consensus, id)}
            valueLabel='Total reward'
            valueSuffix={tokenSymbol}
          />
        </Tab>
        <Tab title='Vote Count'>
          <LeaderboardList
            query={FarmerVoteTotalCountDocument}
            table='leaderboard_farmer_vote_total_counts'
            idLabel='Farmer'
            idLink={(id) => INTERNAL_ROUTES.accounts.id.page(network, Routes.consensus, id)}
            valueType='number'
          />
        </Tab>
        <Tab title='Vote Value'>
          <LeaderboardList
            query={FarmerVoteTotalValueDocument}
            table='leaderboard_farmer_vote_total_values'
            idLabel='Farmer'
            idLink={(id) => INTERNAL_ROUTES.accounts.id.page(network, Routes.consensus, id)}
            valueLabel='Total reward'
            valueSuffix={tokenSymbol}
          />
        </Tab>
        <Tab title='Block Count'>
          <LeaderboardList
            query={FarmerBlockTotalCountDocument}
            table='leaderboard_farmer_block_total_counts'
            idLabel='Farmer'
            idLink={(id) => INTERNAL_ROUTES.accounts.id.page(network, Routes.consensus, id)}
            valueType='number'
          />
        </Tab>
        <Tab title='Block Value'>
          <LeaderboardList
            query={FarmerBlockTotalValueDocument}
            table='leaderboard_farmer_block_total_values'
            idLabel='Farmer'
            idLink={(id) => INTERNAL_ROUTES.accounts.id.page(network, Routes.consensus, id)}
            valueLabel='Total reward'
            valueSuffix={tokenSymbol}
          />
        </Tab>
      </PageTabs>
    </Leaderboard>
  )
}

export const OperatorLeaderboard: FC = () => {
  const isDesktop = useMediaQuery('(min-width: 640px)')
  const { network, tokenSymbol } = useIndexers()

  return (
    <Leaderboard>
      <PageTabs pillStyle='py-2' activePillStyle='py-2' isDesktop={isDesktop}>
        <Tab title='Rewards Collected'>
          <LeaderboardList
            query={OperatorTotalRewardsCollectedDocument}
            table='leaderboard_operator_total_rewards_collecteds'
            idLabel='Operator'
            idLink={(id) => INTERNAL_ROUTES.operators.id.page(network, Routes.staking, id)}
            showAccountIcon={false}
            valueSuffix={tokenSymbol}
          />
        </Tab>
        <Tab title='Tax Collected'>
          <LeaderboardList
            query={OperatorTotalTaxCollectedDocument}
            table='leaderboard_operator_total_tax_collecteds'
            idLabel='Operator'
            idLink={(id) => INTERNAL_ROUTES.operators.id.page(network, Routes.staking, id)}
            showAccountIcon={false}
            valueSuffix={tokenSymbol}
          />
        </Tab>
        <Tab title='Bundle Count'>
          <LeaderboardList
            query={OperatorBundleTotalCountDocument}
            table='leaderboard_operator_bundle_total_counts'
            idLabel='Operator'
            idLink={(id) => INTERNAL_ROUTES.operators.id.page(network, Routes.staking, id)}
            showAccountIcon={false}
            valueType='number'
          />
        </Tab>
        <Tab title='Deposits Count'>
          <LeaderboardList
            query={OperatorDepositsTotalCountDocument}
            table='leaderboard_operator_deposits_total_counts'
            idLabel='Operator'
            idLink={(id) => INTERNAL_ROUTES.operators.id.page(network, Routes.staking, id)}
            showAccountIcon={false}
            valueType='number'
          />
        </Tab>
        <Tab title='Deposits Value'>
          <LeaderboardList
            query={OperatorDepositsTotalValueDocument}
            table='leaderboard_operator_deposits_total_values'
            idLabel='Operator'
            idLink={(id) => INTERNAL_ROUTES.operators.id.page(network, Routes.staking, id)}
            valueSuffix={tokenSymbol}
            showAccountIcon={false}
          />
        </Tab>
        <Tab title='Withdrawals Count'>
          <LeaderboardList
            query={OperatorWithdrawalsTotalCountDocument}
            table='leaderboard_operator_withdrawals_total_counts'
            idLabel='Operator'
            idLink={(id) => INTERNAL_ROUTES.operators.id.page(network, Routes.staking, id)}
            showAccountIcon={false}
            valueType='number'
          />
        </Tab>
      </PageTabs>
    </Leaderboard>
  )
}

export const NominatorLeaderboard: FC = () => {
  const isDesktop = useMediaQuery('(min-width: 640px)')
  const { network, tokenSymbol } = useIndexers()

  return (
    <Leaderboard>
      <PageTabs pillStyle='py-2' activePillStyle='py-2' isDesktop={isDesktop}>
        <Tab title='Deposits Count'>
          <LeaderboardList
            query={NominatorDepositsTotalCountDocument}
            table='leaderboard_nominator_deposits_total_counts'
            idLabel='Nominator'
            idLink={(id) => INTERNAL_ROUTES.accounts.id.page(network, Routes.consensus, id)}
            valueType='number'
          />
        </Tab>
        <Tab title='Deposits Value'>
          <LeaderboardList
            query={NominatorDepositsTotalValueDocument}
            table='leaderboard_nominator_deposits_total_values'
            idLabel='Nominator'
            idLink={(id) => INTERNAL_ROUTES.accounts.id.page(network, Routes.consensus, id)}
            valueSuffix={tokenSymbol}
          />
        </Tab>
        <Tab title='Withdrawals Count'>
          <LeaderboardList
            query={NominatorWithdrawalsTotalCountDocument}
            table='leaderboard_nominator_withdrawals_total_counts'
            idLabel='Nominator'
            idLink={(id) => INTERNAL_ROUTES.accounts.id.page(network, Routes.consensus, id)}
            valueType='number'
          />
        </Tab>
      </PageTabs>
    </Leaderboard>
  )
}
