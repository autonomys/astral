import { AutoIdPage } from 'components/AutoId'
import { NotFound } from 'components/layout/NotFound'
import { indexers } from 'constants/indexers'
import { metadata } from 'constants/metadata'
import { Routes, ROUTES } from 'constants/routes'
import { Metadata } from 'next'
import { FC } from 'react'
import type { ChainPageProps } from 'types/app'

export async function generateMetadata({ params: { chain } }: ChainPageProps): Promise<Metadata> {
  const chainTitle = indexers.find((c) => c.network === chain)?.title || 'Unknown chain'
  const title = `${metadata.title} - ${chainTitle} - Auto ID`
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
  const parent = ROUTES.find((item) => item.name === Routes.domains)
  const item = parent && parent.children?.find((item) => item.name === Routes.autoid)
  if (chain && item && (!item.networks || item.networks?.includes(chain))) return <AutoIdPage />
  return <NotFound />
}

export default Page
