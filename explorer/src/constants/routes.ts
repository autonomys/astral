import { NetworkId } from '@autonomys/auto-utils'
import { Route } from 'types/app'

export enum Routes {
  consensus = 'consensus',
  farming = 'farming',
  staking = 'staking',
  leaderboard = 'leaderboard',
  domains = 'domains',
  nova = 'nova',
  autoid = 'autoid',
  testnetRewards = 'testnet-rewards',
}

export const ROUTES: Route[] = [
  {
    name: Routes.consensus,
    title: 'Consensus Chain',
  },
  {
    name: Routes.farming,
    title: 'Farming',
  },
  {
    name: Routes.staking,
    title: 'Staking',
    networks: [NetworkId.GEMINI_3H],
  },
  {
    name: Routes.leaderboard,
    title: 'Leaderboard',
  },
  {
    name: Routes.domains,
    title: 'Domains',
    children: [
      {
        name: Routes.nova,
        title: 'Nova',
        networks: [NetworkId.GEMINI_3H],
      },
      {
        name: Routes.autoid,
        title: 'Auto-ID',
        networks: [NetworkId.GEMINI_3H],
      },
    ],
    networks: [NetworkId.GEMINI_3H],
  },
  {
    name: Routes.testnetRewards,
    title: 'Testnet Rewards',
  },
]

export const EXTERNAL_ROUTES = {
  autonomys: 'https://autonomys.xyz/',
  academy: 'https://academy.autonomys.xyz/',
  privacyPolicy: 'https://www.autonomys.xyz/privacy-policy',
  forum: 'https://forum.autonomys.xyz/',
  gemini2guide:
    'https://forum.autonomys.xyz/t/how-to-check-your-balance-for-gemini-ii-incentivized-testnet/1081',
  docs: 'https://docs.autonomys.xyz/',
  status: 'https://status.autonomys.xyz/',
  operatorDocs:
    'https://docs.autonomys.xyz/docs/farming-&-staking/staking/operators/register-operator',
  social: {
    twitter: 'https://x.com/AutonomysNet',
    discord: 'https://discord.gg/subspace-network',
    telegram: 'https://t.me/subspace_network',
    github: 'https://github.com/autonomys',
    reddit: 'https://www.reddit.com/r/autonomys',
    medium: 'https://medium.com/subspace-network',
    youtube: 'https://www.youtube.com/@AutonomysNetwork',
    linkedin: 'https://www.linkedin.com/company/autonomys/',
    subSocial: 'https://app.subsocial.network/@NetworkSubspace',
  },
  novaExplorer: 'https://nova.subspace.network/',
  polkadot: (network: NetworkId): string =>
    `https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Frpc-0.${network}.subspace.network%2Fws#/explorer`,
  subscan: 'https://autonomys.subscan.io/',
  spaceAcres: 'https://api.github.com/repos/subspace/space-acres/releases/latest',
}

export const INTERNAL_ROUTES = {
  home: '/',
  blocks: {
    id: {
      path: ':blockId',
      page: (chain: string, domain: string, blockId: number): string =>
        `/${chain}/${domain}/blocks/${blockId}`,
    },
    hash: {
      path: ':blockHash',
      page: (chain: string, domain: string, blockHash: string): string =>
        `/${chain}/${domain}/blocks/${blockHash}`,
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
    nominations: 'nominations',
  },
  domains: {
    id: {
      path: ':domainId',
      page: (chain: string, domain: string, domainId: string): string =>
        `/${chain}/${domain}/${domainId}`,
    },
    list: 'list',
    nova: Routes.nova,
    autoid: Routes.autoid,
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
    accounts: 'accounts',
    farmers: 'farmers',
    operators: 'operators',
    nominators: 'nominators',
  },
  notFound: '/error/404',
  catchAll: '*',
}

export enum API_ROUTES {
  Auth = 'auth',
  Claim = 'claim',
}

export enum CLAIM_TYPES {
  OperatorDisbursement = 'operator-disbursement',
}

export const ROUTE_API = {
  claim: {
    operatorDisbursement: (chain: string): string =>
      `/api/${API_ROUTES.Claim}/${chain}/${CLAIM_TYPES.OperatorDisbursement}`,
  },
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
