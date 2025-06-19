/* eslint-disable react/no-unknown-property */
import { AutonomysSymbol } from 'components/icons/AutonomysSymbol'
import { DocIcon } from 'components/icons/DocIcon'
import { WalletIcon } from 'components/icons/WalletIcon'
import { indexers } from 'constants/indexers'
import { metadata } from 'constants/metadata'
import { AccountByIdDocument, AccountByIdQuery } from 'gql/graphql'
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
    data: { consensus_accounts_by_pk: accountById },
  }: {
    data: AccountByIdQuery
  } = await fetch(chainMatch.indexer, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: AccountByIdDocument['loc']?.source.body,
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
          accountById={accountById}
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
  accountById: AccountByIdQuery['consensus_accounts_by_pk']
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
          {accountId}
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
            <WalletIcon />
            <span
              style={{
                fontFamily: 'sans-serif',
              }}
              tw='absolute text-xl text-white p-4 ml-30 font-bold'
            >
              Total {numberWithCommas(bigNumberToNumber(account.total))} ({tokenSymbol})
            </span>
            <span
              style={{
                fontFamily: 'sans-serif',
              }}
              tw='absolute text-xl text-white p-4 ml-30 mt-8 font-bold'
            >
              Reserved {numberWithCommas(bigNumberToNumber(account.reserved))} ({tokenSymbol})
            </span>
            <span
              style={{
                fontFamily: 'sans-serif',
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
              Total nonces used {numberWithCommas(account.nonce)}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
