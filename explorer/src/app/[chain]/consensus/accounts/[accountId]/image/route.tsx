/* eslint-disable react/no-unknown-property */
import { QUERY_ACCOUNT_BY_ID } from 'components/Consensus/Account/query'
import { AccountByIdQuery } from 'components/gql/graphql'
import { DocIcon, WalletIcon } from 'components/icons'
import { TOKEN } from 'constants/general'
import { indexers } from 'constants/indexers'
import { metadata } from 'constants/metadata'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { notFound } from 'next/navigation'
import { ImageResponse } from 'next/og'
import { NextRequest } from 'next/server'
import { AccountIdPageProps, ChainPageProps } from 'types/app'
import { bigNumberToNumber, numberWithCommas } from 'utils/number'

// export const runtime = 'edge'
export async function GET(
  req: NextRequest,
  { params: { chain, accountId } }: ChainPageProps & AccountIdPageProps,
) {
  if (!chain) notFound()

  const chainMatch = indexers.find((c) => c.network === chain)

  if (!accountId || !chainMatch) notFound()

  const {
    data: { accountById },
  }: {
    data: AccountByIdQuery
  } = await fetch(chainMatch.squids.old, {
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
      <Screen chainMatch={chainMatch} accountId={accountId} accountById={accountById} />,
      {
        width: 1200,
        height: 630,
      },
    )
  } catch (e) {
    console.error(e)
    notFound()
  }
}

function Screen({
  chainMatch,
  accountId,
  accountById,
}: {
  chainMatch: (typeof indexers)[number]
  accountId: string
  accountById: AccountByIdQuery['accountById']
}) {
  dayjs.extend(relativeTime)

  const account = {
    total: accountById?.total ?? '0',
    free: accountById?.free ?? '0',
    reserved: accountById?.reserved ?? '0',
    nonce: accountById?.nonce ?? '0',
  }
  const lastExtrinsic = accountById?.extrinsics[0]
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
        src={'http://localhost:3000//images/backgroundColor.svg'}
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
          }}
          tw='absolute text-4xl text-white p-4 font-bold'
        >
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
              Total {numberWithCommas(bigNumberToNumber(account.total))} ({TOKEN.symbol})
            </span>
            <span
              style={{
                fontFamily: 'Montserrat',
              }}
              tw='absolute text-xl text-white p-4 ml-30 mt-8 font-bold'
            >
              Reserved {numberWithCommas(bigNumberToNumber(account.reserved))} ({TOKEN.symbol})
            </span>
            <span
              style={{
                fontFamily: 'Montserrat',
              }}
              tw='absolute text-xl text-white p-4 ml-30  mt-16 font-bold'
            >
              Free {numberWithCommas(bigNumberToNumber(account.free))} ({TOKEN.symbol})
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
            {lastExtrinsic ? (
              <div tw='absolute flex flex-col'>
                <span
                  style={{
                    fontFamily: 'Montserrat',
                  }}
                  tw='absolute text-xl text-white p-4 ml-30 mt-8 font-bold'
                >
                  Last extrinsic {lastExtrinsic.name.split('.')[1].toUpperCase()}
                </span>
                <span
                  style={{
                    fontFamily: 'Montserrat',
                  }}
                  tw='absolute text-xl text-white p-4 ml-30 mt-16 font-bold'
                >
                  {dayjs(lastExtrinsic.timestamp).fromNow(true) + ' ago'}
                </span>
              </div>
            ) : (
              <span
                style={{
                  fontFamily: 'Montserrat',
                }}
                tw='absolute text-xl text-white p-4 ml-30 mt-16 font-bold'
              >
                This account has no extrinsics
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
