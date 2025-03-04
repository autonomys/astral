/* eslint-disable react/no-unknown-property */
import { AutonomysSymbol } from 'components/icons/AutonomysSymbol'
import { BlockIcon } from 'components/icons/BlockIcon'
import { DocIcon } from 'components/icons/DocIcon'
import { indexers } from 'constants/indexers'
import { metadata } from 'constants/metadata'
import { EventByIdDocument, EventByIdQuery } from 'gql/graphql'
import { notFound } from 'next/navigation'
import { ImageResponse } from 'next/og'
import { NextRequest } from 'next/server'
import { ChainPageProps, EventIdPageProps } from 'types/app'
import { utcToLocalRelativeTime } from 'utils/time'

// export const runtime = 'edge'
export async function GET(
  req: NextRequest,
  { params: { chain, eventId } }: ChainPageProps & EventIdPageProps,
) {
  if (!chain) notFound()

  const chainMatch = indexers.find((c) => c.network === chain)

  if (!eventId || !chainMatch) notFound()

  const {
    data: { consensus_events: eventById },
  }: {
    data: EventByIdQuery
  } = await fetch(chainMatch.indexer, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: EventByIdDocument['loc']?.source.body,
      variables: { eventId },
    }),
  }).then((res) => res.json())

  if (!eventById) notFound()

  try {
    return new ImageResponse(
      <Screen chainMatch={chainMatch} eventId={eventId} eventById={eventById[0]} />,
      {
        width: 1200,
        height: 630,
      },
    )
  } catch (e) {
    console.error('Error in image route', e)
    notFound()
  }
}

function Screen({
  chainMatch,
  eventId,
  eventById,
}: {
  chainMatch: (typeof indexers)[number]
  eventId: string
  eventById: EventByIdQuery['consensus_events'][number]
}) {
  const event = {
    id: eventById?.id ?? '0',
    extrinsicId: eventById?.extrinsic_id ?? '0',
    blockHeight: eventById?.block_height ?? '0',
    section: eventById?.section ?? '0',
    module: eventById?.module ?? '0',
    timestamp: eventById?.timestamp ?? '0',
  }
  const title = `${metadata.title} - ${chainMatch.title} - Event`

  return (
    <div
      tw='relative w-full h-full flex flex-col items-center justify-between'
      style={{
        background: 'linear-gradient(180deg, #050D26 0%, #27355D 100%)',
      }}
    >
      <div
        tw='absolute flex flex-row border-none rounded-[20px] p-4 w-240 h-40'
        style={{
          background: 'linear-gradient(180deg, #032372 0%, #1949D2 100%)',
        }}
      >
        <h2
          style={{
            fontFamily: 'Montserrat',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
          tw='absolute text-4xl text-white p-4 font-bold'
        >
          <AutonomysSymbol fill='white' />
          {title}
        </h2>
        <h3
          style={{
            fontFamily: 'Montserrat',
          }}
          tw='absolute text-2xl text-white p-4 mt-18 font-bold'
        >
          {eventId}
        </h3>
      </div>
      <div tw='absolute flex flex-col w-full'>
        <div
          tw='absolute flex flex-row border-none rounded-[20px] ml-30 mt-70 mb-4 p-6 w-100 h-40'
          style={{
            background: 'linear-gradient(180deg, #032372 0%, #1949D2 100%)',
          }}
        >
          <div tw='absolute flex flex-col w-100 m-6'>
            <BlockIcon />
            <span
              style={{
                fontFamily: 'Montserrat',
              }}
              tw='absolute text-xl text-white p-4 ml-30 font-bold'
            >
              Block {event.blockHeight}
            </span>
            <span
              style={{
                fontFamily: 'Montserrat',
              }}
              tw='absolute text-xl text-white p-4 ml-30 mt-8 font-bold'
            >
              Timestamp {utcToLocalRelativeTime(event.timestamp)}
            </span>
          </div>
        </div>
        <div
          tw='absolute flex flex-row border-none rounded-[20px] ml-140 mt-70 mb-4 p-6 w-130 h-40'
          style={{
            background: 'linear-gradient(180deg, #032372 0%, #1949D2 100%)',
          }}
        >
          <div tw='absolute flex flex-col w-130 m-6'>
            <DocIcon />
            <span
              style={{
                fontFamily: 'Montserrat',
              }}
              tw='absolute text-xl text-white p-4 ml-30 font-bold'
            >
              Event {event.section}.{event.module}
            </span>
            <span
              style={{
                fontFamily: 'Montserrat',
              }}
              tw='absolute text-xl text-white p-4 ml-30 mt-8 font-bold'
            >
              Extrinsic {event.extrinsicId}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
