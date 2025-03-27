export const camelToNormal = (text: string) => text.replace(/([A-Z])/g, ' $1').trim()

export const camelToSnake = (text: string) => text.replace(/([A-Z])/g, '_$1').toLowerCase()

export const allCapsToNormal = (text: string) =>
  text
    .split('_')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ')

export const limitText = (text: string, limit = 20) =>
  text.length > limit ? text.slice(0, limit) + '...' : text
