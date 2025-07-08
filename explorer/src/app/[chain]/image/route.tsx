/* eslint-disable react/no-unknown-property */
import { AutonomysSymbol } from 'components/icons/AutonomysSymbol'
import { BlockIcon } from 'components/icons/BlockIcon'
import { LogoIcon } from 'components/icons/LogoIcon'
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
    console.error(e)
    notFound()
  }
}

function Screen({ chainMatch, data }: { chainMatch: (typeof indexers)[number]; data: HomeQuery }) {
  return (
    <div
      tw='relative w-full h-full flex flex-col items-center justify-between'
      style={{
        background: 'linear-gradient(180deg, #050D26 0%, #27355D 100%)',
      }}
    >
      <div tw='absolute flex flex-row border-none w-full h-full'>
        <div tw='flex flex-col w-full justify ml-15'>
          <LogoIcon />
          <h2
            style={{
              fontFamily: 'sans-serif',
            }}
            tw='absolute text-2xl text-white font-bold ml-2 mt-48'
          >
            {metadata.title}
          </h2>
          <div tw='absolute flex flex-row border-none rounded-lg bg-blueAccent text-xl text-white ml-230 mt-12 mb-4 p-2 pl-4 w-44 h-12'>
            {chainMatch.title}
          </div>
        </div>
      </div>
      <div tw='absolute flex flex-col w-full'>
        <div
          tw='absolute flex flex-row border-none rounded-lg ml-15 mt-65 mb-4 p-6 w-60 h-50'
          style={{
            background: 'linear-gradient(180deg, #6E6ECD 0%, #A196E1 50%, #C2B0EE 100%)',
          }}
        >
          <div tw='absolute flex flex-row w-full m-6 justify-center'>
            <BlockIcon />
            <span
              style={{
                fontFamily: 'sans-serif',
              }}
              tw='absolute text-md text-white mt-24 font-bold'
            >
              Processed Blocks
            </span>
            <span
              style={{
                fontFamily: 'sans-serif',
              }}
              tw='absolute text-2xl text-white p-4 mt-28 font-bold'
            >
              {numberWithCommas(Number(data.consensus_blocks[0].height))}
            </span>
          </div>
        </div>
        <div
          tw='absolute flex flex-row border-none rounded-lg ml-155 mt-65 mb-4 p-6 w-60 h-50'
          style={{
            background: 'linear-gradient(180deg, #032372 0%, #1949D2 100%)',
          }}
        ></div>
        <div
          tw='absolute flex flex-row border-none rounded-lg ml-155 mt-65 mb-4 p-6 w-60 h-50'
          style={{
            background: 'linear-gradient(180deg, #032372 0%, #1949D2 100%)',
          }}
        >
          <div tw='absolute flex flex-row w-full m-6 justify-center'>
            <WalletIcon />
            <span
              style={{
                fontFamily: 'sans-serif',
              }}
              tw='absolute text-md text-white mt-24 font-bold'
            >
              Qualified Reward Addresses
            </span>
            <span
              style={{
                fontFamily: 'sans-serif',
              }}
              tw='absolute text-2xl text-white p-4 mt-28 font-bold'
            >
              {numberWithCommas(Number(data.consensus_accounts_aggregate.aggregate?.count))}
            </span>
          </div>
        </div>
      </div>
      <div tw='absolute flex flex-row border-none w-full h-full'>
        <div tw='flex flex-col w-full justify-center ml-250 mt-140'>
          <AutonomysSymbol fill='#000000' />
          <span
            style={{
              fontFamily: 'sans-serif',
            }}
            tw='absolute text-md text-black pl-8 font-bold mt-140'
          >
            {metadata.authors.name}
          </span>
        </div>
      </div>
    </div>
  )
}
