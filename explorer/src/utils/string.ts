export const shortString = (value: string, initialLength = 6, endLength = -4): string =>
  `${value.slice(0, initialLength)}...${value.slice(endLength)}`

export const camelToNormal = (text: string) => text.replace(/([A-Z])/g, ' $1').trim()

export const camelToSnake = (text: string) => text.replace(/([A-Z])/g, '_$1').toLowerCase()

export const allCapsToNormal = (text: string) =>
  text
    .split('_')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ')

export const capitalizeFirstLetter = (string: string) =>
  string ? string.charAt(0).toUpperCase() + string.slice(1) : ''

export const limitText = (text: string, limit = 20) =>
  text.length > limit ? text.slice(0, limit) + '...' : text

export const formatExtrinsicId = (extrinsicId: string): string => {
  const parts = extrinsicId.split('-')
  const part1 = parts[0].replace(/^0+/, '')
  const part2 = parts[2].replace(/^0+/, '')
  return part1 + '-' + part2
}
