export const camelToNormal = (text: string) => text.replace(/([A-Z])/g, ' $1').trim()

export const camelToSnake = (text: string) => text.replace(/([A-Z])/g, '_$1').toLowerCase()

export const allCapsToNormal = (text: string) =>
  text
    .split('_')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ')

export const limitText = (text: string, limit = 20) =>
  text.length > limit ? text.slice(0, limit) + '...' : text

export const formatExtrinsicId = (extrinsicId: string): string => {
  const parts = extrinsicId.split('-')
  const part1 = parts[0].replace(/^0+/, '')
  const part2 = parts[2].replace(/^0+/, '')
  return part1 + '-' + part2
}
