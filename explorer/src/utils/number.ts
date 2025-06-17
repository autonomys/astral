import { formatEther } from 'ethers'

export const generateArrayOfNumbers = (length: number): number[] => {
  return Array.from(Array(length).keys())
}

export const formatUnitsToNumber = (value: string): number => {
  try {
    const convertedEthers = formatEther(value)
    return parseFloat(convertedEthers)
  } catch (error) {
    console.error('formatUnitsToNumber error:', error)
    return 0
  }
}

export const formatUnits = (value: string): string => {
  try {
    const convertedEthers = formatEther(value)
    return convertedEthers
  } catch (error) {
    console.error('formatUnits', error)
    return 'NaN'
  }
}

export const floatToStringWithDecimals = (value: number, decimals = 4): string =>
  BigInt(value * 10 ** decimals).toString()

export const bigNumberToNumber = (bigNumber: string | bigint | number, precision = 4): number => {
  if (!bigNumber) return 0
  if (typeof bigNumber !== 'string') bigNumber = bigNumber.toString()

  const number = formatUnits(bigNumber)

  return limitNumberDecimals(number, precision)
}

export const numberFormattedString = (number: number, precision = 4): string =>
  new Intl.NumberFormat('en-US', {
    maximumFractionDigits: precision,
  }).format(number)

export const bigNumberToFormattedString = (
  bigNumber: string | bigint | number,
  precision = 4,
): string => numberFormattedString(bigNumberToNumber(bigNumber, precision), precision)

export const bigNumberToString = (bigNumber: string, precision = 4): string => {
  const number = formatUnits(bigNumber)

  return limitStringDecimals(number, precision)
}

export const limitNumberDecimals = (number: number | string, precision = 4): number => {
  if (number === 0) {
    return number
  }

  const [integer, decimals] = String(number).split('.')

  if (!decimals) return Number(integer)

  const decimalsToUse =
    Number(integer) >= 1 ? decimals.slice(0, precision) : decimals.slice(0, precision)

  return Number(integer + '.' + decimalsToUse)
}

export const limitStringDecimals = (number: string, precision = 4): string => {
  if (number === '0') {
    return number
  }

  const [integer, decimals] = String(number).split('.')

  if (!decimals) return integer.toString()

  const decimalsToUse = Number(integer) >= 1 ? decimals.slice(0, 2) : decimals.slice(0, precision)

  return integer + '.' + decimalsToUse
}

export const numberWithCommas = (value: number) => {
  if (value < 1000) {
    return value.toString()
  }

  const parts = value.toString().split('.')
  const integerPart = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  const decimalPart = parts[1] || ''
  const formattedNumber = decimalPart ? integerPart + '.' + decimalPart : integerPart

  return formattedNumber
}

export const numberPositionSuffix = (number: number) => {
  const j = number % 10,
    k = number % 100
  if (j === number && k !== 11) return number + 'st'
  if (j === 2 && k !== 12) return number + 'nd'
  if (j === 3 && k !== 13) return number + 'rd'
  return number + 'th'
}

export const bigIntSerializer = (key: string, value: bigint | unknown): string | unknown =>
  typeof value === 'bigint' ? value.toString() + 'n' : value

export const bigIntDeserializer = (key: string, value: string | unknown): bigint | unknown =>
  typeof value === 'string' && /^\d+n$/.test(value as string)
    ? BigInt(value.toString().slice(0, -1))
    : value

export const safeDivide = (numerator: number, denominator: number): number => {
  if (numerator === 0 || denominator === 0) {
    return 0
  }
  return numerator / denominator
}

export const formatNumberWithUnit = (value: number): { value: number; unit: string } => {
  let unit = ''
  let formattedValue: number = value

  switch (true) {
    case value >= 1_000_000_000:
      formattedValue = parseFloat((value / 1_000_000_000).toFixed(2))
      unit = 'B'
      break
    case value >= 1_000_000:
      formattedValue = parseFloat((value / 1_000_000).toFixed(2))
      unit = 'M'
      break
    case value >= 1_000:
      formattedValue = parseFloat((value / 1_000).toFixed(2))
      unit = 'K'
      break
  }

  return { value: formattedValue, unit }
}
