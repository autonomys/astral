import { Chains } from './chains'

export const domains = [
  {
    title: 'Gemini 3h',
    urls: {
      api: 'https://nova.squid.gemini-3h.subspace.network/graphql',
      page: Chains.gemini3h,
    },
    isDomain: true,
  },
  {
    title: 'Gemini 3g',
    urls: {
      api: 'https://nova.squid.gemini-3g.subspace.network/graphql',
      page: Chains.gemini3g,
    },
    isDomain: true,
  },
]
