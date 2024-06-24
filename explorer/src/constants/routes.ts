export enum Routes {
  nova = 'nova',
  consensus = 'consensus',
  leaderboard = 'leaderboard',
  staking = 'staking',
  // Route deactivated till bugs are fixed and feature is ready
  // stake = 'stake',
}

export const ROUTES = [
  {
    name: Routes.consensus,
    title: 'Consensus Chain',
  },
  {
    name: Routes.nova,
    title: 'Nova',
  },
  {
    name: Routes.leaderboard,
    title: 'Leaderboard',
  },
  {
    name: Routes.staking,
    title: 'Staking',
  },
  // Route deactivated till bugs are fixed and feature is ready
  // {
  //   name: Routes.stake,
  //   title: 'Stake Wars',
  // },
]

export const EXTERNAL_ROUTES = {
  subspace: 'https://subspace.network/',
  subspacePrivacyPolicy: 'https://subspace.network/gdpr-privacy-statement',
  forum: 'https://forum.subspace.network/',
  gemini2guide:
    'https://forum.subspace.network/t/how-to-check-your-balance-for-gemini-ii-incentivized-testnet/1081',
  docs: 'https://docs.subspace.network/',
  operatorDocs:
    'https://docs.subspace.network/docs/farming-&-staking/staking/operators/register-operator',
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
  novaExplorer: 'https://nova.subspace.network/',
  polkadot:
    'https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Frpc-0.gemini-3h.subspace.network%2Fws#/explorer',
  subscan: 'https://subspace.subscan.io/',
}

export const INTERNAL_ROUTES = {
  home: '/',
  blocks: {
    id: {
      path: ':blockId',
      page: (chain: string, domain: string, blockId: number): string =>
        `/${chain}/${domain}/blocks/${blockId}`,
    },
    list: 'blocks',
  },
  accounts: {
    list: 'accounts',
    id: {
      path: ':accountId',
      page: (chain: string, domain: string, accountId: string): string =>
        `/${chain}/${domain}/accounts/${accountId}`,
    },
    rewards: {
      path: ':accountId/rewards',
      page: (chain: string, domain: string, accountId: string): string =>
        `/${chain}/${domain}/accounts/${accountId}/rewards`,
    },
  },
  events: {
    id: {
      path: ':eventId',
      page: (chain: string, domain: string, eventId: string): string =>
        `/${chain}/${domain}/events/${eventId}`,
    },
    list: 'events',
  },
  extrinsics: {
    id: {
      path: ':extrinsicId',
      page: (chain: string, domain: string, extrinsicId: string): string =>
        `/${chain}/${domain}/extrinsics/${extrinsicId}`,
    },
    list: 'extrinsics',
  },
  logs: {
    id: {
      path: ':logId',
      page: (chain: string, domain: string, logId: string): string =>
        `/${chain}/${domain}/logs/${logId}`,
    },
    list: 'logs',
  },
  operators: {
    id: {
      path: ':operatorId',
      page: (chain: string, domain: string, operatorId: string): string =>
        `/${chain}/${domain}/${operatorId}`,
    },
    list: 'list',
    register: 'register',
    manage: 'manage',
    nominators: 'nominators',
    nomination: 'nomination',
  },
  search: {
    result: {
      path: 'search/result/:type',
      page: (chain: string, domain: string, type: string): string =>
        `/${chain}/${domain}/search/result/${type}`,
    },
    empty: (chain: string, domain: string): string => `/${chain}/${domain}/search/no-result-found`,
  },
  leaderboard: {
    farmers: 'farmers',
    operators: 'operators',
    nominators: 'nominators',
  },
  notFound: '/404',
  catchAll: '*',
}

export enum CLAIM_TYPES {
  OperatorDisbursement = 'operator-disbursement',
}

export enum ROUTE_EXTRA_FLAG_TYPE {
  WALLET = 'wallet',
  WALLET_SIDEKICK = 'walletSidekick',
}

export enum ROUTE_FLAG_VALUE_OPEN_CLOSE {
  CLOSE = 'close',
  OPEN = 'open',
}

export const ROUTE_EXTRA_FLAGS = {
  wallet: ROUTE_FLAG_VALUE_OPEN_CLOSE,
  walletSidekick: ROUTE_FLAG_VALUE_OPEN_CLOSE,
}
