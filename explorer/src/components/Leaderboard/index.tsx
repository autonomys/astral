'use client'

import { INTERNAL_ROUTES, Routes } from '@/constants'
import useChains from '@/hooks/useChains'
import { PageTabs } from 'components/common/PageTabs'
import { Tab } from 'components/common/Tabs'
import useMediaQuery from 'hooks/useMediaQuery'
import useWallet from 'hooks/useWallet'
import React, { FC } from 'react'
import { MyPositionSwitch } from '../common/MyPositionSwitch'
import { LeaderboardList } from './LeaderboardList'
import * as Query from './leaderboard.query'

type LeaderboardProps = {
  children: React.ReactNode
}

export const Leaderboard: FC<LeaderboardProps> = ({ children }) => {
  const { subspaceAccount } = useWallet()

  return (
    <div className='flex w-full flex-col space-y-6'>
      <div className='flex flex-col gap-2'>
        <div className='mt-5 flex w-full justify-between'>
          <div className='text-base font-medium text-grayDark dark:text-white'>Leaderboard</div>
        </div>
        <div className='flex items-center'>
          {subspaceAccount && (
            <div className='mr-4 flex w-40 items-center'>
              <MyPositionSwitch labels={['My position', 'Everyone']} />
            </div>
          )}
        </div>
      </div>
      {children}
    </div>
  )
}

export const AccountLeaderboard: FC = () => {
  const isDesktop = useMediaQuery('(min-width: 640px)')
  const { network } = useChains()

  return (
    <Leaderboard>
      <PageTabs isDesktop={isDesktop}>
        <Tab title='Transfer Sender Count'>
          <LeaderboardList
            title='Transfer Sender Count'
            query={Query.QUERY_ACCOUNT_TRANSFER_SENDER_TOTAL_COUNT}
            table='account_transfer_sender_total_count'
            idLink={(id) => INTERNAL_ROUTES.accounts.id.page(network, Routes.consensus, id)}
            valueType='number'
          />
        </Tab>
        <Tab title='Transfer Sender Value'>
          <LeaderboardList
            title='Transfer Sender Value'
            query={Query.QUERY_ACCOUNT_TRANSFER_SENDER_TOTAL_VALUE}
            table='account_transfer_sender_total_value'
            idLink={(id) => INTERNAL_ROUTES.accounts.id.page(network, Routes.consensus, id)}
          />
        </Tab>
        <Tab title='Transfer Receiver Count'>
          <LeaderboardList
            title='Transfer Receiver Count'
            query={Query.QUERY_ACCOUNT_TRANSFER_RECEIVER_TOTAL_COUNT}
            table='account_transfer_receiver_total_count'
            idLink={(id) => INTERNAL_ROUTES.accounts.id.page(network, Routes.consensus, id)}
            valueType='number'
          />
        </Tab>
        <Tab title='Transfer Receiver Value'>
          <LeaderboardList
            title='Transfer Receiver Value'
            query={Query.QUERY_ACCOUNT_TRANSFER_RECEIVER_TOTAL_VALUE}
            table='account_transfer_receiver_total_value'
            idLink={(id) => INTERNAL_ROUTES.accounts.id.page(network, Routes.consensus, id)}
          />
        </Tab>
        <Tab title='Remark Count'>
          <LeaderboardList
            title='Remark Count'
            query={Query.QUERY_ACCOUNT_REMARK_COUNT}
            table='account_remark_count'
            idLink={(id) => INTERNAL_ROUTES.accounts.id.page(network, Routes.consensus, id)}
            valueType='number'
          />
        </Tab>
        <Tab title='Extrinsic Count'>
          <LeaderboardList
            title='Extrinsic Count'
            query={Query.QUERY_ACCOUNT_EXTRINSIC_TOTAL_COUNT}
            table='account_extrinsic_total_count'
            idLink={(id) => INTERNAL_ROUTES.accounts.id.page(network, Routes.consensus, id)}
            valueType='number'
          />
        </Tab>
        <Tab title='Extrinsic Success Count'>
          <LeaderboardList
            title='Extrinsic Success Count'
            query={Query.QUERY_ACCOUNT_EXTRINSIC_SUCCESS_TOTAL_COUNT}
            table='account_extrinsic_success_total_count'
            idLink={(id) => INTERNAL_ROUTES.accounts.id.page(network, Routes.consensus, id)}
            valueType='number'
          />
        </Tab>
        <Tab title='Extrinsic Failed Count'>
          <LeaderboardList
            title='Extrinsic Failed Count'
            query={Query.QUERY_ACCOUNT_EXTRINSIC_FAILED_TOTAL_COUNT}
            table='account_extrinsic_failed_total_count'
            idLink={(id) => INTERNAL_ROUTES.accounts.id.page(network, Routes.consensus, id)}
            valueType='number'
          />
        </Tab>
        <Tab title='Transaction Fee Paid Value'>
          <LeaderboardList
            title='Transaction Fee Paid Value'
            query={Query.QUERY_ACCOUNT_TRANSACTION_FEE_PAID_TOTAL_VALUE}
            table='account_transaction_fee_paid_total_value'
            idLink={(id) => INTERNAL_ROUTES.accounts.id.page(network, Routes.consensus, id)}
          />
        </Tab>
      </PageTabs>
    </Leaderboard>
  )
}

export const FarmerLeaderboard: FC = () => {
  const isDesktop = useMediaQuery('(min-width: 640px)')
  const { network } = useChains()

  return (
    <Leaderboard>
      <PageTabs isDesktop={isDesktop}>
        <Tab title='Vote & Block Count'>
          <LeaderboardList
            title='Vote & Block Count'
            query={Query.QUERY_FARMER_VOTE_AND_BLOCK_TOTAL_COUNT}
            table='farmer_vote_and_block_total_count'
            idLabel='Farmer'
            idLink={(id) => INTERNAL_ROUTES.accounts.id.page(network, Routes.consensus, id)}
            valueType='number'
          />
        </Tab>
        <Tab title='Vote & Block Value'>
          <LeaderboardList
            title='Vote & Block Value'
            query={Query.QUERY_FARMER_VOTE_AND_BLOCK_TOTAL_VALUE}
            table='farmer_vote_and_block_total_value'
            idLabel='Farmer'
            idLink={(id) => INTERNAL_ROUTES.accounts.id.page(network, Routes.consensus, id)}
          />
        </Tab>
        <Tab title='Vote Count'>
          <LeaderboardList
            title='Vote Count'
            query={Query.QUERY_FARMER_VOTE_TOTAL_COUNT}
            table='farmer_vote_total_count'
            idLabel='Farmer'
            idLink={(id) => INTERNAL_ROUTES.accounts.id.page(network, Routes.consensus, id)}
            valueType='number'
          />
        </Tab>
        <Tab title='Vote Value'>
          <LeaderboardList
            title='Vote Value'
            query={Query.QUERY_FARMER_VOTE_TOTAL_VALUE}
            table='farmer_vote_total_value'
            idLabel='Farmer'
            idLink={(id) => INTERNAL_ROUTES.accounts.id.page(network, Routes.consensus, id)}
          />
        </Tab>
        <Tab title='Block Count'>
          <LeaderboardList
            title='Block Count'
            query={Query.QUERY_FARMER_BLOCK_TOTAL_COUNT}
            table='farmer_block_total_count'
            idLabel='Farmer'
            idLink={(id) => INTERNAL_ROUTES.accounts.id.page(network, Routes.consensus, id)}
            valueType='number'
          />
        </Tab>
        <Tab title='Block Value'>
          <LeaderboardList
            title='Block Value'
            query={Query.QUERY_FARMER_BLOCK_TOTAL_VALUE}
            table='farmer_block_total_value'
            idLabel='Farmer'
            idLink={(id) => INTERNAL_ROUTES.accounts.id.page(network, Routes.consensus, id)}
          />
        </Tab>
      </PageTabs>
    </Leaderboard>
  )
}

export const OperatorLeaderboard: FC = () => {
  const isDesktop = useMediaQuery('(min-width: 640px)')
  const { network } = useChains()

  return (
    <Leaderboard>
      <PageTabs isDesktop={isDesktop}>
        <Tab title='Rewards Collected'>
          <LeaderboardList
            title='Rewards Collected'
            query={Query.QUERY_OPERATOR_TOTAL_REWARDS_COLLECTED}
            table='operator_total_rewards_collected'
            idLabel='Operator'
            idLink={(id) => INTERNAL_ROUTES.operators.id.page(network, Routes.staking, id)}
            showAccountIcon={false}
          />
        </Tab>
        <Tab title='Tax Collected'>
          <LeaderboardList
            title='Tax Collected'
            query={Query.QUERY_OPERATOR_TOTAL_TAX_COLLECTED}
            table='operator_total_tax_collected'
            idLabel='Operator'
            idLink={(id) => INTERNAL_ROUTES.operators.id.page(network, Routes.staking, id)}
            showAccountIcon={false}
          />
        </Tab>
        <Tab title='Bundle Count'>
          <LeaderboardList
            title='Bundle Count'
            query={Query.QUERY_OPERATOR_BUNDLE_TOTAL_COUNT}
            table='operator_bundle_total_count'
            idLabel='Operator'
            idLink={(id) => INTERNAL_ROUTES.operators.id.page(network, Routes.staking, id)}
            showAccountIcon={false}
            valueType='number'
          />
        </Tab>
        <Tab title='Deposits Count'>
          <LeaderboardList
            title='Deposits Count'
            query={Query.QUERY_OPERATOR_DEPOSITS_TOTAL_COUNT}
            table='operator_deposits_total_count'
            idLabel='Operator'
            idLink={(id) => INTERNAL_ROUTES.operators.id.page(network, Routes.staking, id)}
            showAccountIcon={false}
            valueType='number'
          />
        </Tab>
        <Tab title='Deposits Value'>
          <LeaderboardList
            title='Deposits Value'
            query={Query.QUERY_OPERATOR_DEPOSITS_TOTAL_VALUE}
            table='operator_deposits_total_value'
            idLabel='Operator'
            idLink={(id) => INTERNAL_ROUTES.operators.id.page(network, Routes.staking, id)}
            showAccountIcon={false}
          />
        </Tab>
        <Tab title='Withdrawals Count'>
          <LeaderboardList
            title='Withdrawals Count'
            query={Query.QUERY_OPERATOR_WITHDRAWALS_TOTAL_COUNT}
            table='operator_withdrawals_total_count'
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
  const { network } = useChains()

  return (
    <Leaderboard>
      <PageTabs isDesktop={isDesktop}>
        <Tab title='Deposits Count'>
          <LeaderboardList
            title='Deposits Count'
            query={Query.QUERY_NOMINATOR_DEPOSITS_TOTAL_COUNT}
            table='nominator_deposits_total_count'
            idLabel='Nominator'
            idLink={(id) => INTERNAL_ROUTES.accounts.id.page(network, Routes.consensus, id)}
            valueType='number'
          />
        </Tab>
        <Tab title='Deposits Value'>
          <LeaderboardList
            title='Deposits Value'
            query={Query.QUERY_NOMINATOR_DEPOSITS_TOTAL_VALUE}
            table='nominator_deposits_total_value'
            idLabel='Nominator'
            idLink={(id) => INTERNAL_ROUTES.accounts.id.page(network, Routes.consensus, id)}
          />
        </Tab>
        <Tab title='Withdrawals Count'>
          <LeaderboardList
            title='Withdrawals Count'
            query={Query.QUERY_NOMINATOR_WITHDRAWALS_TOTAL_COUNT}
            table='nominator_withdrawals_total_count'
            idLabel='Nominator'
            idLink={(id) => INTERNAL_ROUTES.accounts.id.page(network, Routes.consensus, id)}
            valueType='number'
          />
        </Tab>
      </PageTabs>
    </Leaderboard>
  )
}
