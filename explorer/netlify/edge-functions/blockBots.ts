import type { Config } from '@netlify/edge-functions'

export default async function () {
  const html404 =
    '<!DOCTYPE html><html><head><title>404 Not Found</title></head><body><h1>404 Not Found</h1></body></html>'

  return new Response(html404, {
    status: 404,
    headers: {
      'Content-Type': 'text/html',
      'netlify-cdn-cache-control': 'durable, immutable, max-age=31536000, public',
    },
  })
}

export const config: Config = {
  cache: 'manual',
  pattern: '^.*((wp-admin|wp-content|wp-includes|\\.htaccess).*|\\.[Pp][Hh][Pp])$',
}
