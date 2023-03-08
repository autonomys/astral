export const EXTERNAL_ROUTES = {
  subspace: 'https://subspace.network/',
  forum: 'https://forum.subspace.network/',
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
  notFound: '/404',
}
