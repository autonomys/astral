import { NotFound } from 'components/layout/NotFound'
import { RegisterOperators } from 'components/Staking/RegisterOperators'
import { indexers } from 'constants/indexers'
import { metadata } from 'constants/metadata'
import { Routes, ROUTES } from 'constants/routes'
import { Metadata } from 'next'
import { FC } from 'react'
import type { ChainPageProps } from 'types/app'

export async function generateMetadata({ params: { chain } }: ChainPageProps): Promise<Metadata> {
  const chainTitle = indexers.find((c) => c.network === chain)?.title || 'Unknown chain'
  const title = `${metadata.title} - ${chainTitle} - Register Operator`
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

const Page: FC<ChainPageProps> = ({ params: { chain } }: ChainPageProps) => {
  const item = ROUTES.find((item) => item.name === Routes.staking)
  if (chain && item && item.networks?.includes(chain)) return <RegisterOperators />
  return <NotFound />
}

export default Page
