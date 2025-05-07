import { NetworkId } from '@autonomys/auto-utils'
import { url } from 'constants/metadata'
import fs from 'fs'
import type { MetadataRoute } from 'next'
import path from 'path'

const appDir = path.join(process.cwd(), 'src/app')

export function getStaticRoutes(dir = appDir, basePath = ''): string[] {
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
        routes.push(route)
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
  ':profileId',
  ':...not-found',
]

// Important routes that should have higher priority
const highPriorityRoutes = [
  '/staking',
  '/farming',
  '/permanent-storage',
  '/consensus',
  '/domains',
  '/transfer',
  '/stats',
  '/leaderboard',
]

export function filterRoutes(routes: string[]): string[] {
  return routes.filter((route) => !excludePatterns.some((pattern) => route.includes(pattern)))
}

// Function to replace :chain with actual values
export function expandChainRoutes(routes: string[]): string[] {
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

// sitemap generator function
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Get routes directly instead of fetching
  const dynamicRoutes = expandChainRoutes(filterRoutes(getStaticRoutes()))

  // Format the sitemap with correct type
  const sitemapEntries: MetadataRoute.Sitemap = dynamicRoutes.map((route) => {
    // Assign priority based on route importance
    let priority = 0.7

    // Check if any high priority route patterns match the current route
    if (highPriorityRoutes.some((priorityRoute) => route.includes(priorityRoute))) {
      priority = 1.0
    }

    return {
      url: `${url}${route}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority,
    }
  })

  return sitemapEntries
}
