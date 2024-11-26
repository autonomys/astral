/* eslint-disable react/no-unknown-property */
import { QUERY_ACCOUNT_BY_ID } from 'components/Consensus/Account/query'
import { AutonomysSymbol, DocIcon, WalletIcon } from 'components/icons'
import { indexers } from 'constants/indexers'
import { metadata, url } from 'constants/metadata'
import { AccountByIdQuery } from 'gql/graphql'
import { notFound } from 'next/navigation'
import { ImageResponse } from 'next/og'
import { NextRequest } from 'next/server'
import { AccountIdPageProps, ChainPageProps } from 'types/app'
import { getTokenSymbol } from 'utils/network'
import { bigNumberToNumber, numberWithCommas } from 'utils/number'

// export const runtime = 'edge'
export async function GET(
  req: NextRequest,
  { params: { chain, accountId } }: ChainPageProps & AccountIdPageProps,
) {
  if (!chain) notFound()

  const chainMatch = indexers.find((c) => c.network === chain)
  const tokenSymbol = getTokenSymbol(chain)

  if (!accountId || !chainMatch) notFound()

  const {
    data: { consensus_account_histories: accountById },
  }: {
    data: AccountByIdQuery
  } = await fetch(chainMatch.indexer, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: QUERY_ACCOUNT_BY_ID['loc']?.source.body,
      variables: { accountId },
    }),
  }).then((res) => res.json())

  if (!accountById) notFound()

  try {
    return new ImageResponse(
      (
        <Screen
          chainMatch={chainMatch}
          accountId={accountId}
          accountById={accountById[0]}
          tokenSymbol={tokenSymbol}
        />
      ),
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
  accountId,
  accountById,
  tokenSymbol,
}: {
  chainMatch: (typeof indexers)[number]
  accountId: string
  accountById: AccountByIdQuery['consensus_account_histories'][number]
  tokenSymbol: string
}) {
  const account = {
    total: accountById?.total ?? '0',
    free: accountById?.free ?? '0',
    reserved: accountById?.reserved ?? '0',
    nonce: accountById?.nonce ?? '0',
  }
  const title = `${metadata.title} - ${chainMatch.title} - Account`

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
        tw='absolute flex flex-row border-none rounded-[20px] p-4 w-240 h-40'
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
        <h3
          style={{
            fontFamily: 'Montserrat',
          }}
          tw='absolute text-2xl text-white p-4 mt-18 font-bold'
        >
          {accountId}
        </h3>
      </div>
      <div tw='absolute flex flex-col w-full'>
        <div
          tw='absolute flex flex-row border-none rounded-[20px] ml-30 mt-70 mb-4 p-6 w-100 h-40'
          style={{
            background: 'linear-gradient(180deg, #4141B3 0%, #6B5ACF 50%, #896BD2 100%)',
          }}
        >
          <div tw='absolute flex flex-col w-100 m-6'>
            <WalletIcon />
            <span
              style={{
                fontFamily: 'Montserrat',
              }}
              tw='absolute text-xl text-white p-4 ml-30 font-bold'
            >
              Total {numberWithCommas(bigNumberToNumber(account.total))} ({tokenSymbol})
            </span>
            <span
              style={{
                fontFamily: 'Montserrat',
              }}
              tw='absolute text-xl text-white p-4 ml-30 mt-8 font-bold'
            >
              Reserved {numberWithCommas(bigNumberToNumber(account.reserved))} ({tokenSymbol})
            </span>
            <span
              style={{
                fontFamily: 'Montserrat',
              }}
              tw='absolute text-xl text-white p-4 ml-30  mt-16 font-bold'
            >
              Free {numberWithCommas(bigNumberToNumber(account.free))} ({tokenSymbol})
            </span>
          </div>
        </div>
        <div
          tw='absolute flex flex-row border-none rounded-[20px] ml-140 mt-70 mb-4 p-6 w-130 h-40'
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
              tw='absolute text-xl text-white p-4 ml-30 font-bold'
            >
              Total nonces used {numberWithCommas(account.nonce)}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
