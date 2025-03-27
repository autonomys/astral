/* eslint-disable react/no-unknown-property */
import { formatSpaceToDecimal } from '@autonomys/auto-consensus'
import { ArchivedHistoryIcon } from 'components/icons/ArchivedHistoryIcon'
import { AutonomysSymbol } from 'components/icons/AutonomysSymbol'
import { BlockIcon } from 'components/icons/BlockIcon'
import { DocIcon } from 'components/icons/DocIcon'
import { WalletIcon } from 'components/icons/WalletIcon'
import { indexers } from 'constants/indexers'
import { metadata } from 'constants/metadata'
import { HomeDocument, type HomeQuery } from 'gql/graphql'
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
    data: HomeQuery
  } = await fetch(chainMatch.indexer, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: HomeDocument['loc']?.source.body,
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

function Screen({ chainMatch, data }: { chainMatch: (typeof indexers)[number]; data: HomeQuery }) {
  const block = {
    height: data.consensus_blocks[0]?.height ?? '0',
    accountsCount: data.consensus_accounts_aggregate.aggregate?.count ?? 0,
    spacePledged: data.consensus_blocks[0]?.space_pledged ?? '',
    historySize: data.consensus_blocks[0]?.blockchain_size ?? '',
  }
  const title = `${metadata.title} - ${chainMatch.title}`

  return (
    <div
      tw='relative w-full h-full flex flex-col items-center justify-between'
      style={{
        background: 'linear-gradient(180deg, #050D26 0%, #27355D 100%)',
      }}
    >
      <div
        tw='absolute flex flex-row border-none rounded-[20px] p-4 w-240 h-30'
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
      </div>
      <div tw='absolute flex flex-col w-full'>
        <div
          tw='absolute flex flex-row border-none rounded-[20px] ml-30 mt-60 mb-2 p-6 w-100 h-30'
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
              tw='absolute text-2xl text-white p-4 ml-30 font-bold'
            >
              Height {numberWithCommas(block.height)}
            </span>
          </div>
        </div>
        <div
          tw='absolute flex flex-row border-none rounded-[20px] ml-30 mt-100 mb-1 p-6 w-100 h-30'
          style={{
            background: 'linear-gradient(180deg, #032372 0%, #1949D2 100%)',
          }}
        >
          <div tw='absolute flex flex-col w-100 m-6'>
            <WalletIcon />
            <span
              style={{
                fontFamily: 'Montserrat',
              }}
              tw='absolute text-2xl text-white p-4 ml-30 font-bold'
            >
              Accounts {numberWithCommas(block.accountsCount)}
            </span>
          </div>
        </div>
        <div
          tw='absolute flex flex-row border-none rounded-[20px] ml-140 mt-60 mb-4 p-6 w-130 h-30'
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
              tw='absolute text-2xl text-white p-4 ml-30 font-bold'
            >
              Space Pledged {formatSpaceToDecimal(block.spacePledged)}
            </span>
          </div>
        </div>
        <div
          tw='absolute flex flex-row border-none rounded-[20px] ml-140 mt-100 mb-1 p-6 w-130 h-30'
          style={{
            background: 'linear-gradient(180deg, #032372 0%, #1949D2 100%)',
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
