import { shortString } from '@/utils/string'
import { AccountRewardList } from 'components/Account/AccountRewardList'
import { chains } from 'constants/chains'
import { metadata } from 'constants/metadata'
import { Metadata } from 'next'
import { FC } from 'react'
import type { AccountIdPageProps, ChainPageProps } from 'types/app'

export async function generateMetadata({
  params: { chain, accountId },
}: ChainPageProps & AccountIdPageProps): Promise<Metadata> {
  const chainTitle = chains.find((c) => c.urls.page === chain)?.title || 'Unknown chain'
  const title = `${metadata.title} - ${chainTitle} - Account Rewards ${accountId ? shortString(accountId) : ''}`
  return {
    ...metadata,
    title,
    openGraph: {
      ...metadata.openGraph,
      title,
    },
    twitter: {
      ...metadata.twitter,
      title,
    },
  }
}

const Page: FC = () => {
  return <AccountRewardList />
}

export default Page
