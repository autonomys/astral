import { NotFound } from 'components/layout/NotFound'
import { Operator } from 'components/Staking/Operator'
import { indexers } from 'constants/indexers'
import { metadata } from 'constants/metadata'
import { Routes } from 'constants/routes'
import { Metadata } from 'next'
import { FC } from 'react'
import type { AccountIdPageProps, ChainPageProps } from 'types/app'
import { isRouteSupportingNetwork } from 'utils/route'

export async function generateMetadata({
  params: { chain, accountId },
}: ChainPageProps & AccountIdPageProps): Promise<Metadata> {
  const chainTitle = indexers.find((c) => c.network === chain)?.title || 'Unknown chain'
  const title = `${metadata.title} - ${chainTitle} - Operator #${accountId}`
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

const Page: FC<ChainPageProps> = ({ params: { chain } }) =>
  isRouteSupportingNetwork(chain, Routes.staking) ? <Operator /> : <NotFound />

export default Page
