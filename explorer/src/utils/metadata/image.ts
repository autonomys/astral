import { metadata } from 'constants/metadata'
import { headers } from 'next/headers'

export const getImageMetadata = (path: string, generatedImage: boolean = true) => {
  const headersList = headers()
  const domain = headersList.get('x-forwarded-host') || ''
  const protocol = headersList.get('x-forwarded-proto') || ''
  const imagePath = generatedImage ? `${path}/image` : path
  return {
    ...metadata.openGraph.images,
    url: new URL(imagePath, `${protocol}://${domain}`).toString(),
    secureUrl: new URL(imagePath, `${protocol}://${domain}`).toString(),
  }
}
