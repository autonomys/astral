import { shortString } from '@/utils/string'
import { Account } from 'components/Account/Account'
import { Metadata } from 'next'
import { FC } from 'react'
import type { AccountIdPageProps, ChainPageProps } from 'types/app'
import { generateMetadataWithLabel } from 'utils/metadata'

export const generateMetadata = ({
  params: { chain, accountId },
}: ChainPageProps & AccountIdPageProps): Metadata =>
  generateMetadataWithLabel(chain, `Account ${accountId ? shortString(accountId) : ''}`)

const Page: FC = () => {
  return <Account />
}

export default Page
