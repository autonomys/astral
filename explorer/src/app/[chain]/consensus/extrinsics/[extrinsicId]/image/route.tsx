/* eslint-disable react/no-unknown-property */
import { shortString } from '@autonomys/auto-utils'
import { AutonomysSymbol } from 'components/icons/AutonomysSymbol'
import { BlockIcon } from 'components/icons/BlockIcon'
import { DocIcon } from 'components/icons/DocIcon'
import { indexers } from 'constants/indexers'
import { metadata } from 'constants/metadata'
import { ExtrinsicsByIdDocument, ExtrinsicsByIdQuery } from 'gql/graphql'
import { notFound } from 'next/navigation'
import { ImageResponse } from 'next/og'
import { NextRequest } from 'next/server'
import { ChainPageProps, ExtrinsicIdPageProps } from 'types/app'
import { numberWithCommas } from 'utils/number'
import { utcToLocalRelativeTime } from 'utils/time'

// export const runtime = 'edge'
export async function GET(
  req: NextRequest,
  { params: { chain, extrinsicId } }: ChainPageProps & ExtrinsicIdPageProps,
) {
  if (!chain) notFound()

  const chainMatch = indexers.find((c) => c.network === chain)

  if (!extrinsicId || !chainMatch) notFound()

  const {
    data: { consensus_extrinsics: extrinsicById },
  }: {
    data: ExtrinsicsByIdQuery
  } = await fetch(chainMatch.indexer, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: ExtrinsicsByIdDocument['loc']?.source.body,
      variables: { extrinsicId },
    }),
  }).then((res) => res.json())

  if (!extrinsicById) notFound()

  try {
    return new ImageResponse(
      <Screen chainMatch={chainMatch} extrinsicId={extrinsicId} extrinsicById={extrinsicById[0]} />,
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
  extrinsicId,
  extrinsicById,
}: {
  chainMatch: (typeof indexers)[number]
  extrinsicId: string
  extrinsicById: ExtrinsicsByIdQuery['consensus_extrinsics'][number]
}) {
  const extrinsic = {
    success: extrinsicById?.success ?? false,
    hash: extrinsicById?.hash ?? '0',
    timestamp: extrinsicById?.timestamp ?? '0',
    blockHeight: extrinsicById?.block_height ?? '0',
    section: extrinsicById?.section ?? '',
    module: extrinsicById?.module ?? '',
    eventsCount: extrinsicById?.events_count ?? 0,
    signer: extrinsicById?.signer ?? '',
  }
  const title = `${metadata.title} - ${chainMatch.title} - Extrinsic`

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
          {extrinsicId}
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
              Height {numberWithCommas(extrinsic.blockHeight)}
            </span>
            <span
              style={{
                fontFamily: 'Montserrat',
              }}
              tw='absolute text-xl text-white p-4 ml-30 mt-8 font-bold'
            >
              Hash {shortString(extrinsic.hash)}
            </span>
            <span
              style={{
                fontFamily: 'Montserrat',
              }}
              tw='absolute text-xl text-white p-4 ml-30  mt-16 font-bold'
            >
              Timestamp {utcToLocalRelativeTime(extrinsic.timestamp)}
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
              Events {numberWithCommas(extrinsic.eventsCount)}
            </span>
            <span
              style={{
                fontFamily: 'Montserrat',
              }}
              tw='absolute text-xl text-white p-4 ml-30 mt-8 font-bold'
            >
              Signer {shortString(extrinsic.signer)}
            </span>
            <span
              style={{
                fontFamily: 'Montserrat',
              }}
              tw='absolute text-xl text-white p-4 ml-30 mt-16 font-bold'
            >
              Extrinsic {extrinsic.section}.{extrinsic.module}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
