import { shortString } from '@autonomys/auto-utils'
import { Extrinsic } from 'components/Consensus/Extrinsic/Extrinsic'
import { Routes } from 'constants/routes'
import { Metadata } from 'next'
import { FC } from 'react'
import type { ChainPageProps, ExtrinsicIdPageProps } from 'types/app'
import { getMetadata } from 'utils/metadata/basic'

export const generateMetadata = ({
  params: { chain, extrinsicId },
}: ChainPageProps & ExtrinsicIdPageProps): Metadata =>
  getMetadata(
    chain,
    'Extrinsic',
    extrinsicId ? shortString(extrinsicId) : '',
    `${chain}/${Routes.consensus}/extrinsics/${extrinsicId}`,
  )

const Page: FC = () => <Extrinsic />

export default Page
