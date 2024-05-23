export enum Chains {
  gemini3h = 'gemini-3h',
  gemini3g = 'gemini-3g',
  devnet = 'devnet',
  localhost = 'localhost',
}

export const chains = [
  {
    title: 'Gemini 3h',
    urls: {
      api: 'https://squid.gemini-3h.subspace.network/graphql',
      rpc: 'wss://rpc-0.gemini-3h.subspace.network/ws',
      page: Chains.gemini3h,
    },
    isDomain: false,
  },
  {
    title: 'Gemini 3g',
    urls: {
      api: 'https://squid.gemini-3g.subspace.network/graphql',
      rpc: 'wss://rpc-0.gemini-3g.subspace.network/ws',
      page: Chains.gemini3g,
    },
    isDomain: false,
  },
]

export const chainesSet = new Set(chains.map((chain) => chain.urls.page))

export const defaultChain = chains[0]

export const squidLinks = {
  general: 'https://squid.green.gemini-3h.subspace.network/graphql',
  rewards: 'https://rewards.squid.green.gemini-3h.subspace.network/graphql',
  account: 'https://account.squid.green.gemini-3h.subspace.network/graphql',
}
