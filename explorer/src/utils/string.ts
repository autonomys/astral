export const shortString = (value: string, initialLength = 6, endLength = -4): string =>
  `${value.slice(0, initialLength)}...${value.slice(endLength)}`

export const camelToNormal = (text: string) => text.replace(/([A-Z])/g, ' $1').trim()

export const capitalizeFirstLetter = (string: string) =>
  string.charAt(0).toUpperCase() + string.slice(1)
