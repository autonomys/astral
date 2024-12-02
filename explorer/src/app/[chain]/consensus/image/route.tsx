/* eslint-disable react/no-unknown-property */
import { formatSpaceToDecimal } from '@autonomys/auto-consensus'
import { QUERY_HOME } from 'components/Consensus/Home/query'
import { ArchivedHistoryIcon, AutonomysSymbol, BlockIcon, DocIcon } from 'components/icons'
import { indexers } from 'constants/indexers'
import { metadata, url } from 'constants/metadata'
import { HomeQueryQuery } from 'gql/graphql'
import { notFound } from 'next/navigation'
import { ImageResponse } from 'next/og'
import { NextRequest } from 'next/server'
import { ChainPageProps } from 'types/app'
import { numberWithCommas } from 'utils/number'

// export const runtime = 'edge'
export async function GET(req: NextRequest, { params: { chain } }: ChainPageProps) {
  if (!chain) notFound()

  const chainMatch = indexers.find((c) => c.network === chain)
  if (!chainMatch) notFound()

  const {
    data,
  }: {
    data: HomeQueryQuery
  } = await fetch(chainMatch.indexer, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: QUERY_HOME['loc']?.source.body,
      variables: { limit: 1, offset: 0 },
    }),
  }).then((res) => res.json())

  if (!data) notFound()

  try {
    return new ImageResponse(<Screen chainMatch={chainMatch} data={data} />, {
      width: 1200,
      height: 630,
    })
  } catch (e) {
    console.error('Error in image route', e)
    notFound()
  }
}

function Screen({
  chainMatch,
  data,
}: {
  chainMatch: (typeof indexers)[number]
  data: HomeQueryQuery
}) {
  const block = {
    height: data.consensus_blocks[0]?.height ?? '0',
    timestamp: data.consensus_blocks[0]?.state_root ?? '0',
    extrinsicsCount: data.consensus_extrinsics_aggregate.aggregate?.count ?? 0,
    spacePledged: data.consensus_blocks[0]?.space_pledged ?? '',
    historySize: data.consensus_blocks[0]?.blockchain_size ?? '',
  }
  const title = `${metadata.title} - ${chainMatch.title}`

  return (
    <div
      tw='relative w-full h-full flex flex-col items-center justify-between'
      style={{
        background: 'linear-gradient(180deg, #0B050F 0%, #4D2F92 50%, #BC8EDA 100%)',
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={url + '/images/backgroundColor.svg'}
        tw='w-[1200px] h-[630px]'
        alt={'Background Color'}
      />
      <div
        tw='absolute flex flex-row border-none rounded-[20px] p-4 w-240 h-30'
        style={{
          background: 'linear-gradient(180deg, #4141B3 0%, #6B5ACF 50%, #896BD2 100%)',
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
      </div>
      <div tw='absolute flex flex-col w-full'>
        <div
          tw='absolute flex flex-row border-none rounded-[20px] ml-30 mt-60 mb-2 p-6 w-100 h-30'
          style={{
            background: 'linear-gradient(180deg, #4141B3 0%, #6B5ACF 50%, #896BD2 100%)',
          }}
        >
          <div tw='absolute flex flex-col w-100 m-6'>
            <BlockIcon />
            <span
              style={{
                fontFamily: 'Montserrat',
              }}
              tw='absolute text-2xl text-white p-4 ml-30 font-bold'
            >
              Height {numberWithCommas(block.height)}
            </span>
          </div>
        </div>
        <div
          tw='absolute flex flex-row border-none rounded-[20px] ml-30 mt-100 mb-1 p-6 w-100 h-30'
          style={{
            background: 'linear-gradient(180deg, #4141B3 0%, #6B5ACF 50%, #896BD2 100%)',
          }}
        >
          <div tw='absolute flex flex-col w-100 m-6'>
            <DocIcon />
            <span
              style={{
                fontFamily: 'Montserrat',
              }}
              tw='absolute text-2xl text-white p-4 ml-30 font-bold'
            >
              Extrinsics {numberWithCommas(block.extrinsicsCount)}
            </span>
          </div>
        </div>
        <div
          tw='absolute flex flex-row border-none rounded-[20px] ml-140 mt-60 mb-4 p-6 w-130 h-30'
          style={{
            background: 'linear-gradient(180deg, #4141B3 0%, #6B5ACF 50%, #896BD2 100%)',
          }}
        >
          <div tw='absolute flex flex-col w-130 m-6'>
            <DocIcon />
            <span
              style={{
                fontFamily: 'Montserrat',
              }}
              tw='absolute text-2xl text-white p-4 ml-30 font-bold'
            >
              Space Pledged {formatSpaceToDecimal(block.spacePledged)}
            </span>
          </div>
        </div>
        <div
          tw='absolute flex flex-row border-none rounded-[20px] ml-140 mt-100 mb-1 p-6 w-130 h-30'
          style={{
            background: 'linear-gradient(180deg, #4141B3 0%, #6B5ACF 50%, #896BD2 100%)',
          }}
        >
          <div tw='absolute flex flex-col w-130 m-6'>
            <ArchivedHistoryIcon />
            <span
              style={{
                fontFamily: 'Montserrat',
              }}
              tw='absolute text-2xl text-white p-4 ml-30 font-bold'
            >
              History Size {formatSpaceToDecimal(block.historySize)}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
