/* eslint-disable react/no-unknown-property */
import { shortString } from '@autonomys/auto-utils'
import { QUERY_EVENT_BY_ID } from 'components/Consensus/Event/query'
import { AutonomysSymbol, BlockIcon, DocIcon } from 'components/icons'
import { indexers } from 'constants/indexers'
import { metadata } from 'constants/metadata'
import { EventByIdQuery } from 'gql/graphql'
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
      query: QUERY_EVENT_BY_ID['loc']?.source.body,
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
    name: eventById?.name ?? '0',
    phase: eventById?.phase ?? '0',
    timestamp: eventById?.timestamp ?? '0',
    eventsCount: eventById?.name ?? '0',
    eventAuthor: eventById?.extrinsic?.signer ?? '',
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
              Phase {event.phase}
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
              Event {event.name}
            </span>
            <span
              style={{
                fontFamily: 'Montserrat',
              }}
              tw='absolute text-xl text-white p-4 ml-30 mt-8 font-bold'
            >
              Signer {shortString(event.eventAuthor)}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
