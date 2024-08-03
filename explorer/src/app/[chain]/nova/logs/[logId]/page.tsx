import { Log } from 'components/Log/Log'
import { Metadata } from 'next'
import { FC } from 'react'
import type { ChainPageProps, LogIdPageProps } from 'types/app'
import { generateMetadataWithLabel } from 'utils/metadata'

export const generateMetadata = ({
  params: { chain, logId },
}: ChainPageProps & LogIdPageProps): Metadata => generateMetadataWithLabel(chain, `Log #${logId}`)

const Page: FC = () => {
  return <Log />
}

export default Page
