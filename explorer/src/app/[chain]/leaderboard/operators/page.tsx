import { NotFound } from 'components/layout/NotFound'
import { OperatorLeaderboard } from 'components/Leaderboard/index'
import { indexers } from 'constants/indexers'
import { metadata } from 'constants/metadata'
import { Routes } from 'constants/routes'
import { Metadata } from 'next'
import { FC } from 'react'
import type { ChainPageProps } from 'types/app'
import { isRouteSupportingNetwork } from 'utils/route'

export async function generateMetadata({ params: { chain } }: ChainPageProps): Promise<Metadata> {
  const chainTitle = indexers.find((c) => c.network === chain)?.title || 'Unknown chain'
  const title = `${metadata.title} - ${chainTitle} - Operator Leaderboard`
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
  isRouteSupportingNetwork(chain, Routes.leaderboard) ? <OperatorLeaderboard /> : <NotFound />

export default Page
