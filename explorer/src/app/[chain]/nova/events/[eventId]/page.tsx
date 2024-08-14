import { Event } from 'components/Event/Event'
import { Metadata } from 'next'
import { FC } from 'react'
import type { ChainPageProps, EventIdPageProps } from 'types/app'
import { generateMetadataWithLabel } from 'utils/metadata'

export const generateMetadata = ({
  params: { chain, eventId },
}: ChainPageProps & EventIdPageProps): Metadata =>
  generateMetadataWithLabel(chain, `Event #${eventId}`)

const Page: FC = () => {
  return <Event />
}

export default Page
