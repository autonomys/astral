import { NetworkId } from '@autonomys/auto-utils'
import fs from 'fs'
import { NextResponse } from 'next/server'
import path from 'path'

const appDir = path.join(process.cwd(), 'src/app')

function getStaticRoutes(dir = appDir, basePath = ''): string[] {
  const entries = fs.readdirSync(dir, { withFileTypes: true })
  let routes: string[] = []

  for (const entry of entries) {
    if (entry.isDirectory()) {
      routes = routes.concat(
        getStaticRoutes(path.join(dir, entry.name), `${basePath}/${entry.name}`),
      )
    } else {
      if (entry.name.startsWith('page.') || entry.name.startsWith('route.')) {
        let route = `${basePath}`
        route = route.replace(/\[([^\]]+)\]/g, ':$1') // Convert "[id]" to ":id"
        routes.push(route === '' ? '/' : route)
      }
    }
  }
  return routes
}

const excludePatterns = [
  '/auth/',
  '/api/',
  ':accountId',
  ':blockId',
  ':eventId',
  ':logId',
  ':domainId',
  ':cid',
  ':operatorId',
  ':extrinsicId',
  ':...not-found',
]

function filterRoutes(routes: string[]): string[] {
  return routes.filter((route) => !excludePatterns.some((pattern) => route.includes(pattern)))
}

// Function to replace :chain with actual values
function expandChainRoutes(routes: string[]): string[] {
  const networkIds = [NetworkId.TAURUS, NetworkId.MAINNET] // Replace values dynamically
  const expandedRoutes: string[] = []

  for (const route of routes) {
    if (route.includes(':chain')) {
      networkIds.forEach((networkId) => {
        expandedRoutes.push(route.replace(':chain', networkId))
      })
    } else {
      expandedRoutes.push(route)
    }
  }
  return expandedRoutes
}

export async function GET() {
  const routes = getStaticRoutes()
  const filteredRoutes = filterRoutes(routes) // Apply filter
  const expandedRoutes = expandChainRoutes(filteredRoutes) // Replace :chain
  return NextResponse.json(expandedRoutes)
}
