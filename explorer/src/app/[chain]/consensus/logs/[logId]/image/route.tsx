/* eslint-disable react/no-unknown-property */
import { AutonomysSymbol } from 'components/icons/AutonomysSymbol'
import { BlockIcon } from 'components/icons/BlockIcon'
import { DocIcon } from 'components/icons/DocIcon'
import { indexers } from 'constants/indexers'
import { metadata } from 'constants/metadata'
import { LogByIdDocument, LogByIdQuery } from 'gql/graphql'
import { notFound } from 'next/navigation'
import { ImageResponse } from 'next/og'
import { NextRequest } from 'next/server'
import { ChainPageProps, LogIdPageProps } from 'types/app'
import { numberWithCommas } from 'utils/number'

// export const runtime = 'edge'
export async function GET(
  req: NextRequest,
  { params: { chain, logId } }: ChainPageProps & LogIdPageProps,
) {
  if (!chain) notFound()

  const chainMatch = indexers.find((c) => c.network === chain)

  if (!logId || !chainMatch) notFound()

  const {
    data: { consensus_logs: logById },
  }: {
    data: LogByIdQuery
  } = await fetch(chainMatch.indexer, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: LogByIdDocument['loc']?.source.body,
      variables: { logId },
    }),
  }).then((res) => res.json())

  if (!logById) notFound()

  try {
    return new ImageResponse(
      <Screen chainMatch={chainMatch} logId={logId} logById={logById[0]} />,
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
  logId,
  logById,
}: {
  chainMatch: (typeof indexers)[number]
  logId: string
  logById: LogByIdQuery['consensus_logs'][number]
}) {
  const log = {
    id: logById?.id ?? '0',
    height: logById?.block_height ?? '0',
    kind: logById?.kind ?? '0',
    value: logById?.value ?? '',
  }
  const title = `${metadata.title} - ${chainMatch.title} - Log`

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
          {logId}
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
                fontFamily: 'sans-serif',
              }}
              tw='absolute text-xl text-white p-4 ml-30 font-bold'
            >
              Height {numberWithCommas(log.height)}
            </span>
            <span
              style={{
                fontFamily: 'sans-serif',
              }}
              tw='absolute text-xl text-white p-4 ml-30 mt-8 font-bold'
            >
              Kind {log.kind}
            </span>
            <span
              style={{
                fontFamily: 'sans-serif',
              }}
              tw='absolute text-xl text-white p-4 ml-30  mt-16 font-bold'
            >
              Log {log.id}
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
                fontFamily: 'sans-serif',
              }}
              tw='absolute text-md text-white p-4 ml-30 font-bold'
            >
              Value {log.value.slice(0, 40)}...
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
