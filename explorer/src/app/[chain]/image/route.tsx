/* eslint-disable react/no-unknown-property */
import { QUERY_HOME } from 'components/Consensus/Home/query'
import { HomeQueryQuery } from 'components/gql/graphql'
import {
  AutonomysSymbol,
  BlockIcon,
  DocIcon,
  LogoIcon,
  PieChartIcon,
  WalletIcon,
} from 'components/icons'
import { ACCOUNT_MIN_VAL } from 'constants/account'
import { indexers } from 'constants/indexers'
import { metadata } from 'constants/metadata'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { notFound } from 'next/navigation'
import { ImageResponse } from 'next/og'
import { NextRequest } from 'next/server'
import { ChainPageProps } from 'types/app'
import { formatSpacePledged, numberWithCommas } from 'utils/number'

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
      variables: { limit: 3, offset: 0, accountTotal: ACCOUNT_MIN_VAL },
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

function Screen({
  chainMatch,
  data,
}: {
  chainMatch: (typeof indexers)[number]
  data: HomeQueryQuery
}) {
  dayjs.extend(relativeTime)

  return (
    <div
      tw='relative w-full h-full flex flex-col items-center justify-between'
      style={{
        background: 'linear-gradient(180deg, #0B050F 0%, #4D2F92 50%, #BC8EDA 100%)',
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={'http://localhost:3000//images/backgroundColor.svg'}
        tw='w-[1200px] h-[630px]'
        alt={'Background Color'}
      />
      <div tw='absolute flex flex-row border-none w-full h-full'>
        <div tw='flex flex-col w-full justify ml-15'>
          <LogoIcon />
          <h2
            style={{
              fontFamily: 'Montserrat',
            }}
            tw='absolute text-2xl text-white font-bold ml-2 mt-48'
          >
            {metadata.title}
          </h2>
          <div tw='absolute flex flex-row border-none rounded-[20px] bg-blueAccent text-xl text-white ml-230 mt-12 mb-4 p-2 pl-4 w-44 h-12'>
            {chainMatch.title}
          </div>
        </div>
      </div>
      <div tw='absolute flex flex-col w-full'>
        <div
          tw='absolute flex flex-row border-none rounded-[20px] ml-15 mt-65 mb-4 p-6 w-60 h-50'
          style={{
            background: 'linear-gradient(180deg, #6E6ECD 0%, #A196E1 50%, #C2B0EE 100%)',
          }}
        >
          <div tw='absolute flex flex-row w-full m-6 justify-center'>
            <BlockIcon />
            <span
              style={{
                fontFamily: 'Montserrat',
              }}
              tw='absolute text-md text-white mt-24 font-bold'
            >
              Processed Blocks
            </span>
            <span
              style={{
                fontFamily: 'Montserrat',
              }}
              tw='absolute text-2xl text-white p-4 mt-28 font-bold'
            >
              {numberWithCommas(Number(data.blocks[0].height))}
            </span>
          </div>
        </div>
        <div
          tw='absolute flex flex-row border-none rounded-[20px] ml-85 mt-65 mb-4 p-6 w-60 h-50'
          style={{
            background: 'linear-gradient(180deg, #5649A3 0%, #8EABE4 100%)',
          }}
        >
          <div tw='absolute flex flex-row w-full m-6 justify-center'>
            <DocIcon />
            <span
              style={{
                fontFamily: 'Montserrat',
              }}
              tw='absolute text-md text-white mt-24 font-bold'
            >
              Signed Extrinsics
            </span>
            <span
              style={{
                fontFamily: 'Montserrat',
              }}
              tw='absolute text-2xl text-white p-4 mt-28 font-bold'
            >
              {numberWithCommas(Number(data.extrinsicsConnection.totalCount))}
            </span>
          </div>
        </div>
        <div
          tw='absolute flex flex-row border-none rounded-[20px] ml-155 mt-65 mb-4 p-6 w-60 h-50'
          style={{
            background: 'linear-gradient(180deg, #AC70E1 0%, #E6ADDC 100%)',
          }}
        >
          <div tw='absolute flex flex-row w-full m-6 justify-center'>
            <WalletIcon />
            <span
              style={{
                fontFamily: 'Montserrat',
              }}
              tw='absolute text-md text-white mt-24 font-bold'
            >
              Qualified Reward Addresses
            </span>
            <span
              style={{
                fontFamily: 'Montserrat',
              }}
              tw='absolute text-2xl text-white p-4 mt-28 font-bold'
            >
              {numberWithCommas(Number(data.accountsConnection.totalCount))}
            </span>
          </div>
        </div>
        <div
          tw='absolute flex flex-row border-none rounded-[20px] ml-225 mt-65 mb-4 p-6 w-60 h-50'
          style={{
            background: 'linear-gradient(180deg, #6E6ECD 0%, #A196E1 50%, #C2B0EE 100%)',
          }}
        >
          <div tw='absolute flex flex-row w-full m-6 justify-center'>
            <PieChartIcon />
            <span
              style={{
                fontFamily: 'Montserrat',
              }}
              tw='absolute text-md text-white mt-24 font-bold'
            >
              Total Space Pledged
            </span>
            <span
              style={{
                fontFamily: 'Montserrat',
              }}
              tw='absolute text-2xl text-white p-4 mt-28 font-bold'
            >
              {formatSpacePledged(
                Number((data.blocks[0] as HomeQueryQuery['blocks'][0])?.spacePledged || 0),
              )}
            </span>
          </div>
        </div>
      </div>
      <div tw='absolute flex flex-row border-none w-full h-full'>
        <div tw='flex flex-col w-full justify-center ml-250 mt-140'>
          <AutonomysSymbol fill='#000000' />
          <span
            style={{
              fontFamily: 'Montserrat',
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
