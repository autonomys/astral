import { Log } from 'components/Consensus/Log/Log'
import { RoutesConsensus } from 'constants/routes'
import { Metadata } from 'next'
import { FC } from 'react'
import type { ChainPageProps, LogIdPageProps } from 'types/app'
import { getMetadata } from 'utils/metadata/basic'

export const generateMetadata = ({
  params: { chain, logId },
}: ChainPageProps & LogIdPageProps): Metadata =>
  getMetadata(chain, 'Log', logId, `${chain}/${RoutesConsensus.logs}/${logId}`)

const Page: FC = () => <Log />

export default Page
