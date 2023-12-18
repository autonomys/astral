import { ethers } from 'ethers'

export const shortString = (value: string, initialLength = 6, endLength = -4): string =>
  `${value.slice(0, initialLength)}...${value.slice(endLength)}`

export const generateArrayOfNumbers = (length: number): number[] => {
  return Array.from(Array(length).keys())
}

export const formatUnits = (value: string): number => {
  const convertedEthers = ethers.formatEther(value)

  return parseFloat(convertedEthers)
}

export const bigNumberToNumber = (bigNumber: string): number => {
  const number = Number(formatUnits(bigNumber))

  return limitNumberDecimals(number)
}

export const limitNumberDecimals = (number: number, precision = 4): number => {
  if (number === 0) {
    return number
  }

  const [integer, decimals] = String(number).split('.')

  if (!decimals) return Number(integer)

  const decimalsToUse = Number(integer) >= 1 ? decimals.slice(0, 2) : decimals.slice(0, precision)

  return Number(integer + '.' + decimalsToUse)
}

export const formatSpacePledged = (value: number) => {
  const TB = 1024 * 1024 * 1024 * 1024
  const GB = 1024 * 1024 * 1024
  const MB = 1024 * 1024

  if (value >= TB) {
    return `${Math.round((value * 100) / TB) / 100} TiB`
  } else if (value >= GB) {
    return `${Math.round((value * 100) / GB) / 100} GB`
  } else {
    return `${Math.round((value * 100) / MB) / 100} MB`
  }
}

export const numberWithCommas = (value: number) => {
  const parts = value.toString().split('.')
  const integerPart = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  const decimalPart = parts[1] || ''
  const formattedNumber = decimalPart ? integerPart + '.' + decimalPart : integerPart

  return formattedNumber
}
