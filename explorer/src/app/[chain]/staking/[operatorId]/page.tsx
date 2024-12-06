import { NotFound } from 'components/layout/NotFound'
import { Operator } from 'components/Staking/Operator'
import { Routes, RoutesStaking } from 'constants/routes'
import { Metadata } from 'next'
import { FC } from 'react'
import type { ChainPageProps, OperatorIdPageProps } from 'types/app'
import { getMetadata } from 'utils/metadata/basic'
import { isRouteSupportingNetwork } from 'utils/route'

export const generateMetadata = ({
  params: { chain, operatorId },
}: ChainPageProps & OperatorIdPageProps): Metadata =>
  getMetadata(chain, 'Operator #Id' + operatorId, undefined)

const Page: FC<ChainPageProps> = ({ params: { chain } }) =>
  isRouteSupportingNetwork(chain, Routes.staking, RoutesStaking.operators) ? (
    <Operator />
  ) : (
    <NotFound />
  )

export default Page
