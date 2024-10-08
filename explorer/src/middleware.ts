import { NetworkId } from '@autonomys/auto-utils'
import { defaultIndexer } from 'constants/indexers'
import { Routes } from 'constants/routes'
import { NextRequest, NextResponse } from 'next/server'

export async function middleware(req: NextRequest) {
  const headers = new Headers(req.headers)

  // To-Do: Fix this (breaking next-auth)
  // if (req.method === 'POST' && req.body) {
  //   const body = await req.json()
  //   if (body && body.trustedData && body.trustedData.messageBytes)
  //     headers.set('frames-messageBytes', body.trustedData.messageBytes)
  // }

  const {
    nextUrl: { search },
  } = req
  const urlSearchParams = new URLSearchParams(search)
  const params = Object.fromEntries(urlSearchParams.entries())
  const urlParams = '?' + new URLSearchParams(params)

  if (req.nextUrl.pathname === '/') {
    return NextResponse.redirect(
      new URL(`/${defaultIndexer.network}/${Routes.consensus}/${urlParams}`, req.url),
    )
  } else if (
    Object.values(NetworkId).includes(req.nextUrl.pathname.replace('/', '') as NetworkId)
  ) {
    return NextResponse.redirect(
      new URL(`/${defaultIndexer.network}/${Routes.consensus}/${urlParams}`, req.url),
    )
  }

  return NextResponse.next({
    request: {
      headers,
    },
  })
}
