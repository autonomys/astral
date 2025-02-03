import type { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const url = process.env.NEXTAUTH_URL || 'https://explorer.autonomys.xyz'

  // Fetch routes dynamically from API
  const response = await fetch(`${url}/api/routes`)
  const dynamicRoutes: string[] = await response.json()

  // Format the sitemap with correct type
  const sitemapEntries: MetadataRoute.Sitemap = dynamicRoutes.map((route) => ({
    url: `${url}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.8,
  }))

  return sitemapEntries
}
