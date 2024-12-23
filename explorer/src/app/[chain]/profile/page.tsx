import { isRouteSupportingNetwork } from '@/utils/route'
import { NotFound } from 'components/layout/NotFound'
import { ProfilePage } from 'components/Profile'
import { Routes, RoutesProfile } from 'constants/routes'
import { Metadata } from 'next'
import { FC } from 'react'
import type { ChainPageProps } from 'types/app'
import { getMetadata } from 'utils/metadata/basic'

export const generateMetadata = ({ params: { chain } }: ChainPageProps): Metadata =>
  getMetadata(chain, 'Profile', undefined, '/images/share.png', false)

const Page: FC<ChainPageProps> = ({ params: { chain } }) =>
  isRouteSupportingNetwork(chain, Routes.profile, RoutesProfile.profile) ? (
    <ProfilePage />
  ) : (
    <NotFound />
  )

export default Page
