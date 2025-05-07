import { Transfer } from 'components/Transfer'
import { NotFound } from 'components/layout/NotFound'
import { Routes } from 'constants/routes'
import { Metadata } from 'next'
import { FC } from 'react'
import type { ChainPageProps } from 'types/app'
import { getMetadata } from 'utils/metadata/basic'
import { isRouteSupportingNetwork } from 'utils/route'

export const generateMetadata = ({ params: { chain } }: ChainPageProps): Metadata => {
  const metadata = getMetadata(chain, 'Transfer', undefined)
  return {
    ...metadata,
    title: 'Autonomys Transfer | Send tokens and assets securely on the Autonomys Network',
    description:
      'Search and explore AUT token transfers and on-chain transactions. View transaction details by hash, block, or address on the Autonomy blockchain explorer',
  }
}

const Page: FC<ChainPageProps> = ({ params: { chain } }) =>
  isRouteSupportingNetwork(chain, Routes.transfer) ? <Transfer /> : <NotFound />

export default Page
