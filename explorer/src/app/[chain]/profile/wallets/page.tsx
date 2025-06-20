import { NotFound } from 'components/layout/NotFound'
import { WalletsPage } from 'components/Profile/Wallets'
import { Routes, RoutesProfile } from 'constants/routes'
import { Metadata } from 'next'
import { FC } from 'react'
import type { ChainPageProps } from 'types/app'
import { getMetadata } from 'utils/metadata/basic'
import { isRouteSupportingNetwork } from 'utils/route'

export const generateMetadata = ({ params: { chain } }: ChainPageProps): Metadata =>
  getMetadata(chain, 'Profile Wallets', undefined, '/images/share.png', false)

const Page: FC<ChainPageProps> = ({ params: { chain } }) =>
  isRouteSupportingNetwork(chain, Routes.profile, RoutesProfile.apiKeys) ? (
    <WalletsPage />
  ) : (
    <NotFound />
  )

export default Page
