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
            <div className='mr-4 flex w-44 items-center'>
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
      <PageTabs isDesktop={isDesktop}>
        <Tab title='Extrinsic Count'>
          <LeaderboardList
            title='Extrinsic Count'
            query={AccountExtrinsicTotalCountDocument}
            table='leaderboard_account_extrinsic_total_counts'
            idLink={(id) => INTERNAL_ROUTES.accounts.id.page(network, Routes.consensus, id)}
            valueType='number'
          />
        </Tab>
        <Tab title='Extrinsic Success Count'>
          <LeaderboardList
            title='Extrinsic Success Count'
            query={AccountExtrinsicSuccessTotalCountDocument}
            table='leaderboard_account_extrinsic_success_total_counts'
            idLink={(id) => INTERNAL_ROUTES.accounts.id.page(network, Routes.consensus, id)}
            valueType='number'
          />
        </Tab>
        <Tab title='Extrinsic Failed Count'>
          <LeaderboardList
            title='Extrinsic Failed Count'
            query={AccountExtrinsicFailedTotalCountDocument}
            table='leaderboard_account_extrinsic_failed_total_counts'
            idLink={(id) => INTERNAL_ROUTES.accounts.id.page(network, Routes.consensus, id)}
            valueType='number'
          />
        </Tab>
        <Tab title='Transaction Fee Paid Value'>
          <LeaderboardList
            title='Transaction Fee Paid Value'
            query={AccountTransactionFeePaidTotalValueDocument}
            table='leaderboard_account_transaction_fee_paid_total_values'
            idLink={(id) => INTERNAL_ROUTES.accounts.id.page(network, Routes.consensus, id)}
            valueLabel='Total fee paid'
            valueSuffix={tokenSymbol}
          />
        </Tab>
        <Tab title='Transfer Sender Count'>
          <LeaderboardList
            title='Transfer Sender Count'
            query={AccountTransferSenderTotalCountDocument}
            table='leaderboard_account_transfer_sender_total_counts'
            idLink={(id) => INTERNAL_ROUTES.accounts.id.page(network, Routes.consensus, id)}
            valueType='number'
          />
        </Tab>
        <Tab title='Transfer Sender Value'>
          <LeaderboardList
            title='Transfer Sender Value'
            query={AccountTransferSenderTotalValueDocument}
            table='leaderboard_account_transfer_sender_total_values'
            idLink={(id) => INTERNAL_ROUTES.accounts.id.page(network, Routes.consensus, id)}
            valueLabel='Total sent'
            valueSuffix={tokenSymbol}
          />
        </Tab>
        <Tab title='Transfer Receiver Count'>
          <LeaderboardList
            title='Transfer Receiver Count'
            query={AccountTransferReceiverTotalCountDocument}
            table='leaderboard_account_transfer_receiver_total_counts'
            idLink={(id) => INTERNAL_ROUTES.accounts.id.page(network, Routes.consensus, id)}
            valueType='number'
          />
        </Tab>
        <Tab title='Transfer Receiver Value'>
          <LeaderboardList
            title='Transfer Receiver Value'
            query={AccountTransferReceiverTotalValueDocument}
            table='leaderboard_account_transfer_receiver_total_values'
            idLink={(id) => INTERNAL_ROUTES.accounts.id.page(network, Routes.consensus, id)}
            valueLabel='Total received'
            valueSuffix={tokenSymbol}
          />
        </Tab>
        <Tab title='Remark Count'>
          <LeaderboardList
            title='Remark Count'
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
      <PageTabs isDesktop={isDesktop}>
        <Tab title='Vote & Block Count'>
          <LeaderboardList
            title='Vote & Block Count'
            query={FarmerVoteAndBlockTotalCountDocument}
            table='leaderboard_farmer_vote_and_block_total_counts'
            idLabel='Farmer'
            idLink={(id) => INTERNAL_ROUTES.accounts.id.page(network, Routes.consensus, id)}
            valueType='number'
          />
        </Tab>
        <Tab title='Vote & Block Value'>
          <LeaderboardList
            title='Vote & Block Value'
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
            title='Vote Count'
            query={FarmerVoteTotalCountDocument}
            table='leaderboard_farmer_vote_total_counts'
            idLabel='Farmer'
            idLink={(id) => INTERNAL_ROUTES.accounts.id.page(network, Routes.consensus, id)}
            valueType='number'
          />
        </Tab>
        <Tab title='Vote Value'>
          <LeaderboardList
            title='Vote Value'
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
            title='Block Count'
            query={FarmerBlockTotalCountDocument}
            table='leaderboard_farmer_block_total_counts'
            idLabel='Farmer'
            idLink={(id) => INTERNAL_ROUTES.accounts.id.page(network, Routes.consensus, id)}
            valueType='number'
          />
        </Tab>
        <Tab title='Block Value'>
          <LeaderboardList
            title='Block Value'
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
      <PageTabs isDesktop={isDesktop}>
        <Tab title='Rewards Collected'>
          <LeaderboardList
            title='Rewards Collected'
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
            title='Tax Collected'
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
            title='Bundle Count'
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
            title='Deposits Count'
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
            title='Deposits Value'
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
            title='Withdrawals Count'
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
      <PageTabs isDesktop={isDesktop}>
        <Tab title='Deposits Count'>
          <LeaderboardList
            title='Deposits Count'
            query={NominatorDepositsTotalCountDocument}
            table='leaderboard_nominator_deposits_total_counts'
            idLabel='Nominator'
            idLink={(id) => INTERNAL_ROUTES.accounts.id.page(network, Routes.consensus, id)}
            valueType='number'
          />
        </Tab>
        <Tab title='Deposits Value'>
          <LeaderboardList
            title='Deposits Value'
            query={NominatorDepositsTotalValueDocument}
            table='leaderboard_nominator_deposits_total_values'
            idLabel='Nominator'
            idLink={(id) => INTERNAL_ROUTES.accounts.id.page(network, Routes.consensus, id)}
            valueSuffix={tokenSymbol}
          />
        </Tab>
        <Tab title='Withdrawals Count'>
          <LeaderboardList
            title='Withdrawals Count'
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
