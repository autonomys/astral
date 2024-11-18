import { DEFAULT_TOKEN, networks, Token } from '@autonomys/auto-utils'

export const getToken = (chain: string): Token => {
  const network = networks.find((n) => n.id === chain)
  return network?.token ?? DEFAULT_TOKEN
}

export const getTokenSymbol = (chain: string): string => getToken(chain).symbol

export const getTokenDecimals = (chain: string): number => getToken(chain).decimals
