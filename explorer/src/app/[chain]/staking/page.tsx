import { NotFound } from 'components/layout/NotFound'
import { StakingComingSoon } from 'components/Staking/StakingComingSoon'
import { Routes } from 'constants/routes'
import { Metadata } from 'next'
import { FC } from 'react'
import type { ChainPageProps } from 'types/app'
import { getMetadata } from 'utils/metadata/basic'
import { isRouteSupportingNetwork } from 'utils/route'

export const generateMetadata = ({ params: { chain } }: ChainPageProps): Metadata => {
  const baseMetadata = getMetadata(chain, 'Staking', undefined)
  return {
    ...baseMetadata,
    title: 'Autonomys Staking | Validator Rewards & Staking Dashboard',
    description:
      'Stake AI3 tokens and support decentralized storage. View validator performance, uptime, and storage pledged. Join Autonomys consensus and earn rewards',
  }
}

const Page: FC<ChainPageProps> = ({ params: { chain } }) =>
  isRouteSupportingNetwork(chain, Routes.staking) ? <StakingComingSoon /> : <NotFound />

export default Page
