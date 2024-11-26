import { metadata } from 'constants/metadata'
import { headers } from 'next/headers'

export const getImageMetadata = (path: string) => {
  const headersList = headers()
  const domain = headersList.get('x-forwarded-host') || ''
  const protocol = headersList.get('x-forwarded-proto') || ''

  return {
    ...metadata.openGraph.images,
    url: new URL(`${path}/image`, `${protocol}://${domain}`).toString(),
    secureUrl: new URL(`${path}/image`, `${protocol}://${domain}`).toString(),
  }
}
