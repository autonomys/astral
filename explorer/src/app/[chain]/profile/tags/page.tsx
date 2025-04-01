import { NotFound } from 'components/layout/NotFound'
import { TagsPage } from 'components/Profile/Tags'
import { Routes, RoutesProfile } from 'constants/routes'
import { Metadata } from 'next'
import { FC } from 'react'
import type { ChainPageProps } from 'types/app'
import { getMetadata } from 'utils/metadata/basic'
import { isRouteSupportingNetwork } from 'utils/route'

export const generateMetadata = ({ params: { chain } }: ChainPageProps): Metadata =>
  getMetadata(chain, 'Profile Tags', undefined, '/images/share.png', false)

const Page: FC<ChainPageProps> = ({ params: { chain } }) => {
  if (isRouteSupportingNetwork(chain, Routes.profile, RoutesProfile.tags)) {
    return <TagsPage />
  }
  return <NotFound />
}

export default Page
