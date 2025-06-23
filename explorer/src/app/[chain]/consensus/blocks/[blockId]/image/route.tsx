/* eslint-disable react/no-unknown-property */
import { shortString } from '@autonomys/auto-utils'
import { AutonomysSymbol } from 'components/icons/AutonomysSymbol'
import { BlockIcon } from 'components/icons/BlockIcon'
import { DocIcon } from 'components/icons/DocIcon'
import { indexers } from 'constants/indexers'
import { metadata } from 'constants/metadata'
import { BlockByIdDocument, BlockByIdQuery } from 'gql/graphql'
import { notFound } from 'next/navigation'
import { ImageResponse } from 'next/og'
import { NextRequest } from 'next/server'
import { BlockIdPageProps, ChainPageProps } from 'types/app'
import { numberWithCommas } from 'utils/number'
import { utcToLocalRelativeTime } from 'utils/time'

// export const runtime = 'edge'
export async function GET(
  req: NextRequest,
  { params: { chain, blockId } }: ChainPageProps & BlockIdPageProps,
) {
  if (!chain) notFound()

  const chainMatch = indexers.find((c) => c.network === chain)

  if (!blockId || !chainMatch) notFound()

  const {
    data: { consensus_blocks: blockById },
  }: {
    data: BlockByIdQuery
  } = await fetch(chainMatch.indexer, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: BlockByIdDocument['loc']?.source.body,
      variables: { blockId, blockHash: blockId },
    }),
  }).then((res) => res.json())

  if (!blockById) notFound()

  try {
    return new ImageResponse(
      <Screen chainMatch={chainMatch} blockId={blockId} blockById={blockById[0]} />,
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
  blockId,
  blockById,
}: {
  chainMatch: (typeof indexers)[number]
  blockId: string
  blockById: BlockByIdQuery['consensus_blocks'][number]
}) {
  const block = {
    height: blockById?.height ?? '0',
    hash: blockById?.hash ?? '0',
    timestamp: blockById?.state_root ?? '0',
    extrinsicsCount: blockById?.extrinsics_count ?? '0',
    eventsCount: blockById?.events_count ?? '0',
    blockAuthor: blockById?.author_id ?? '',
  }
  const title = `${metadata.title} - ${chainMatch.title} - Block`

  return (
    <div
      tw='relative w-full h-full flex flex-col items-center justify-between'
      style={{
        background: 'linear-gradient(180deg, #050D26 0%, #27355D 100%)',
      }}
    >
      <div
        tw='absolute flex flex-row border-none rounded-lg p-4 w-240 h-40'
        style={{
          background: 'linear-gradient(180deg, #032372 0%, #1949D2 100%)',
        }}
      >
        <h2
          style={{
            fontFamily: 'sans-serif',
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
            fontFamily: 'sans-serif',
          }}
          tw='absolute text-2xl text-white p-4 mt-18 font-bold'
        >
          {blockId}
        </h3>
      </div>
      <div tw='absolute flex flex-col w-full'>
        <div
          tw='absolute flex flex-row border-none rounded-lg ml-30 mt-70 mb-4 p-6 w-100 h-40'
          style={{
            background: 'linear-gradient(180deg, #032372 0%, #1949D2 100%)',
          }}
        >
          <div tw='absolute flex flex-col w-100 m-6'>
            <BlockIcon />
            <span
              style={{
                fontFamily: 'sans-serif',
              }}
              tw='absolute text-xl text-white p-4 ml-30 font-bold'
            >
              Height {numberWithCommas(block.height)}
            </span>
            <span
              style={{
                fontFamily: 'sans-serif',
              }}
              tw='absolute text-xl text-white p-4 ml-30 mt-8 font-bold'
            >
              Hash {shortString(block.hash)}
            </span>
            <span
              style={{
                fontFamily: 'sans-serif',
              }}
              tw='absolute text-xl text-white p-4 ml-30  mt-16 font-bold'
            >
              Timestamp {utcToLocalRelativeTime(block.timestamp)}
            </span>
          </div>
        </div>
        <div
          tw='absolute flex flex-row border-none rounded-lg ml-140 mt-70 mb-4 p-6 w-130 h-40'
          style={{
            background: 'linear-gradient(180deg, #032372 0%, #1949D2 100%)',
          }}
        >
          <div tw='absolute flex flex-col w-130 m-6'>
            <DocIcon />
            <span
              style={{
                fontFamily: 'sans-serif',
              }}
              tw='absolute text-xl text-white p-4 ml-30 font-bold'
            >
              Extrinsics {numberWithCommas(block.extrinsicsCount)}
            </span>
            <span
              style={{
                fontFamily: 'sans-serif',
              }}
              tw='absolute text-xl text-white p-4 ml-30 mt-8 font-bold'
            >
              Events {numberWithCommas(block.eventsCount)}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
