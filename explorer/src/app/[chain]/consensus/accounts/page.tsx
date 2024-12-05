import { RoutesConsensus } from '@/constants/routes'
import { getMetadata } from '@/utils/metadata/basic'
import { AccountList } from 'components/Consensus/Account/AccountList'
import { Metadata } from 'next'
import type { ChainPageProps } from 'types/app'

export const generateMetadata = ({ params: { chain } }: ChainPageProps): Metadata =>
  getMetadata(chain, 'Accounts', undefined, `${chain}/${RoutesConsensus.accounts}`)

export default function Page() {
  return <AccountList />
}
