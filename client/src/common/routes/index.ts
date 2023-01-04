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
      page: (blockId: number): string => `/blocks/${blockId}`,
    },
    list: 'blocks',
  },
  accounts: {
    list: 'accounts',
    id: {
      path: ':accountId',
      page: (accountId: string): string => `/accounts/${accountId}`,
    },
  },
  events: {
    id: {
      path: ':eventId',
      page: (eventId: string): string => `/events/${eventId}`,
    },
    list: 'events',
  },
  extrinsics: {
    id: {
      path: ':extrinsicId',
      page: (extrinsicId: string): string => `/extrinsics/${extrinsicId}`,
    },
    list: 'extrinsics',
  },
  logs: {
    id: {
      path: ':logId',
      page: (logId: string): string => `/logs/${logId}`,
    },
    list: 'logs',
  },
  notFound: '/404',
}
