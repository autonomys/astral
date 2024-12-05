import { NotFound } from 'components/layout/NotFound'
import { RegisterOperators } from 'components/Staking/RegisterOperators'
import { Routes, RoutesStaking } from 'constants/routes'
import { Metadata } from 'next'
import { FC } from 'react'
import type { ChainPageProps } from 'types/app'
import { getMetadata } from 'utils/metadata/basic'
import { isRouteSupportingNetwork } from 'utils/route'

export const generateMetadata = ({ params: { chain } }: ChainPageProps): Metadata =>
  getMetadata(chain, 'Register Operator', undefined)

const Page: FC<ChainPageProps> = ({ params: { chain } }) =>
  isRouteSupportingNetwork(chain, Routes.staking, RoutesStaking.register) ? (
    <RegisterOperators />
  ) : (
    <NotFound />
  )

export default Page
