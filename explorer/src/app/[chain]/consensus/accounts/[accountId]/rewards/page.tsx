import { AccountRewardList } from 'components/Consensus/Account/AccountRewardList'
import { Metadata } from 'next'
import { FC } from 'react'
import type { ChainPageProps } from 'types/app'
import { getMetadata } from 'utils/metadata/basic'

export const generateMetadata = ({ params: { chain } }: ChainPageProps): Metadata =>
  getMetadata(chain, 'Account Rewards', undefined)

const Page: FC = () => <AccountRewardList />

export default Page
