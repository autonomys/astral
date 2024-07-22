import { Chain, Chains } from './chains'

export const domains: Chain[] = [
  {
    title: 'Gemini 3h',
    urls: {
      page: Chains.gemini3h,
      rpc: 'https://nova-0.gemini-3h.subspace.network/ws',
      squids: {
        old: 'https://nova.squid.gemini-3h.subspace.network/graphql',
      },
    },
    token: {
      symbol: 'tATC',
      decimals: 18,
    },
    isDomain: true,
  },
  {
    title: 'Gemini 3g',
    urls: {
      page: Chains.gemini3g,
      rpc: 'https://nova-0.gemini-3g.subspace.network/ws',
      squids: {
        old: 'https://nova.squid.gemini-3g.subspace.network/graphql',
      },
    },
    token: {
      symbol: 'tATC',
      decimals: 18,
    },
    isDomain: true,
  },
]
