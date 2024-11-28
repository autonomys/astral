import { shortString } from '@autonomys/auto-utils'
import { Account } from 'components/Consensus/Account/Account'
import { Routes } from 'constants/routes'
import { Metadata } from 'next'
import { FC } from 'react'
import type { AccountIdPageProps, ChainPageProps } from 'types/app'
import { getMetadata } from 'utils/metadata/basic'

export const generateMetadata = ({
  params: { chain, accountId },
}: ChainPageProps & AccountIdPageProps): Metadata =>
  getMetadata(
    chain,
    'Account',
    accountId ? shortString(accountId) : '',
    `${chain}/${Routes.consensus}/accounts/${accountId}`,
  )

const Page: FC = () => <Account />

export default Page
