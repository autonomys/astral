import { NotFound } from 'components/layout/NotFound'
import { NominationsTable } from 'components/Staking/NominationsTable'
import { Routes, RoutesStaking } from 'constants/routes'
import { Metadata } from 'next'
import { FC } from 'react'
import type { ChainPageProps } from 'types/app'
import { getMetadata } from 'utils/metadata/basic'
import { isRouteSupportingNetwork } from 'utils/route'

export const generateMetadata = ({ params: { chain } }: ChainPageProps): Metadata =>
  getMetadata(chain, 'Nominations', undefined)

const Page: FC<ChainPageProps> = ({ params: { chain } }) =>
  isRouteSupportingNetwork(chain, Routes.staking, RoutesStaking.nominations) ? (
    <NominationsTable />
  ) : (
    <NotFound />
  )

export default Page
