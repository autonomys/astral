export const EXTERNAL_ROUTES = {
  subspace: 'https://subspace.network/',
  forum: 'https://forum.subspace.network/',
  gemini2guide:
    'https://forum.subspace.network/t/how-to-check-your-balance-for-gemini-ii-incentivized-testnet/1081',
  docs: 'https://docs.subspace.network/',
  social: {
    twitter: 'https://twitter.com/NetworkSubspace',
    discord: 'https://discord.gg/subspace-network',
    telegram: 'https://t.me/subspace_network',
    github: 'https://github.com/subspace',
    reddit: 'https://www.reddit.com/r/sub',
    medium: 'https://medium.com/subspace-network',
    youtube: 'https://www.youtube.com/channel/UCojYRCZOtVTJHJXivOYJzeQ',
    linkedin: 'https://www.linkedin.com/company/subspace-blockchain/',
    subSocial: 'https://app.subsocial.network/@NetworkSubspace',
  },
}

export const INTERNAL_ROUTES = {
  home: '/',
  blocks: {
    id: {
      path: ':blockId',
      page: (chain: string, blockId: number): string => `/${chain}/blocks/${blockId}`,
    },
    list: 'blocks',
  },
  accounts: {
    list: 'accounts',
    id: {
      path: ':accountId',
      page: (chain: string, accountId: string): string => `/${chain}/accounts/${accountId}`,
    },
    rewards: {
      path: ':accountId/rewards',
      page: (chain: string, accountId: string): string => `/${chain}/accounts/${accountId}/rewards`,
    },
  },
  events: {
    id: {
      path: ':eventId',
      page: (chain: string, eventId: string): string => `/${chain}/events/${eventId}`,
    },
    list: 'events',
  },
  extrinsics: {
    id: {
      path: ':extrinsicId',
      page: (chain: string, extrinsicId: string): string => `/${chain}/extrinsics/${extrinsicId}`,
    },
    list: 'extrinsics',
  },
  logs: {
    id: {
      path: ':logId',
      page: (chain: string, logId: string): string => `/${chain}/logs/${logId}`,
    },
    list: 'logs',
  },
  operators: {
    id: {
      path: ':operatorId',
      page: (chain: string, operatorId: string): string => `/${chain}/operator/${operatorId}`,
    },
    list: 'operators',
  },
  search: {
    result: {
      path: 'search/result/:type',
      page: (chain: string, type: string): string => `/${chain}/search/result/${type}`,
    },
    empty: '/search/no-result-found',
  },
  leaderBoard: '/leaderBoard',
  tokenCalculator: {
    id: {
      path: ':accountId',
      page: (chain: string, accountId: string): string => `/${chain}/accounts/${accountId}`,
    },
    list: 'tokenCalculator',
  },
  notFound: '/404',
}
