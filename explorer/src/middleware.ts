import { Chains, defaultChain } from '@/constants/chains'
import { Routes } from '@/constants/routes'
import { NextRequest, NextResponse } from 'next/server'

export async function middleware(req: NextRequest) {
  const headers = new Headers(req.headers)

  if (req.method === 'POST' && req.body) {
    const body = await req.json()
    if (body && body.trustedData && body.trustedData.messageBytes)
      headers.set('frames-messageBytes', body.trustedData.messageBytes)
  }

  const {
    nextUrl: { search },
  } = req
  const urlSearchParams = new URLSearchParams(search)
  const params = Object.fromEntries(urlSearchParams.entries())
  const urlParams = '?' + new URLSearchParams(params)

  if (req.nextUrl.pathname === '/') {
    return NextResponse.redirect(
      new URL(`/${defaultChain.urls.page}/${Routes.consensus}/${urlParams}`, req.url),
    )
  } else if (Object.values(Chains).includes(req.nextUrl.pathname.replace('/', '') as Chains)) {
    return NextResponse.redirect(
      new URL(`/${defaultChain.urls.page}/${Routes.consensus}/${urlParams}`, req.url),
    )
  }

  return NextResponse.next({
    request: {
      headers,
    },
  })
}
