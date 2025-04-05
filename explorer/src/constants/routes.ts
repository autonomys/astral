import { NetworkId } from '@autonomys/auto-utils'
import { Route } from 'types/app'

export enum Routes {
  consensus = 'consensus',
  farming = 'farming',
  storage = 'permanent-storage',
  staking = 'staking',
  leaderboard = 'leaderboard',
  domains = 'domains',
  autoevm = 'auto-evm',
  autoid = 'auto-id',
  transfer = 'transfer',
  stats = 'stats',
  testnetRewards = 'testnet-rewards',
  profile = 'profile',
}

export enum RoutesConsensus {
  accounts = Routes.consensus + '/accounts',
  blocks = Routes.consensus + '/blocks',
  extrinsics = Routes.consensus + '/extrinsics',
  events = Routes.consensus + '/events',
  logs = Routes.consensus + '/logs',
  files = Routes.consensus + '/files',
}

export enum RoutesStorage {
  files = Routes.storage + '/files',
  folders = Routes.storage + '/folders',
}

export enum RoutesStaking {
  operators = Routes.staking + '/operators',
  register = Routes.staking + '/register',
  nominations = Routes.staking + '/nominations',
}

export enum RoutesLeaderboard {
  farmers = Routes.leaderboard + '/farmers',
  accounts = Routes.leaderboard + '/accounts',
  operators = Routes.leaderboard + '/operators',
  nominators = Routes.leaderboard + '/nominators',
}

export enum RoutesDomains {
  autoevm = '/auto-evm',
  autoid = '/auto-id',
}

export enum RoutesTransfer {
  transfer = '/transfer',
  history = Routes.transfer + '/history',
}

export enum RoutesProfile {
  profile = '/profile',
  wallets = Routes.profile + '/wallets',
  apiKeys = Routes.profile + '/api-keys',
  tags = Routes.profile + '/tags',
}

export type AnyRoutes =
  | Routes
  | RoutesConsensus
  | RoutesStorage
  | RoutesStaking
  | RoutesLeaderboard
  | RoutesDomains
  | RoutesTransfer
  | RoutesProfile

export const ROUTES: Route[] = [
  {
    name: Routes.consensus,
    title: 'Consensus Chain',
    children: [
      {
        name: RoutesConsensus.accounts,
        title: 'Accounts',
      },
      {
        name: RoutesConsensus.blocks,
        title: 'Blocks',
      },
      {
        name: RoutesConsensus.extrinsics,
        title: 'Extrinsics',
      },
      {
        name: RoutesConsensus.events,
        title: 'Events',
      },
      {
        name: RoutesConsensus.logs,
        title: 'Logs',
      },
    ],
  },
  {
    name: Routes.farming,
    title: 'Farming',
  },
  {
    name: Routes.storage,
    title: 'Permanent Storage',
    children: [
      {
        name: RoutesStorage.files,
        title: 'Files',
      },
      {
        name: RoutesStorage.folders,
        title: 'Folders',
      },
    ],
  },
  {
    name: Routes.staking,
    title: 'Staking',
    networks: [NetworkId.TAURUS, NetworkId.LOCALHOST],
    children: [
      {
        name: RoutesStaking.operators,
        title: 'Operators',
        networks: [NetworkId.TAURUS, NetworkId.LOCALHOST],
      },
      {
        name: RoutesStaking.register,
        title: 'Register Operator',
        networks: [NetworkId.TAURUS, NetworkId.LOCALHOST],
      },
      {
        name: RoutesStaking.nominations,
        title: 'My Nominations',
        networks: [NetworkId.TAURUS, NetworkId.LOCALHOST],
      },
    ],
  },
  {
    name: Routes.leaderboard,
    title: 'Leaderboard',
    children: [
      {
        name: RoutesLeaderboard.farmers,
        title: 'Top Farmers',
      },
      {
        name: RoutesLeaderboard.accounts,
        title: 'Top Accounts',
        networks: [NetworkId.TAURUS, NetworkId.LOCALHOST],
      },
      {
        name: RoutesLeaderboard.operators,
        title: 'Top Operators',
        networks: [NetworkId.TAURUS, NetworkId.LOCALHOST],
      },
      {
        name: RoutesLeaderboard.nominators,
        title: 'Top Nominators',
        networks: [NetworkId.TAURUS, NetworkId.LOCALHOST],
      },
    ],
  },
  {
    name: Routes.domains,
    title: 'Domains',
    networks: [NetworkId.TAURUS, NetworkId.LOCALHOST],
    children: [
      {
        name: RoutesDomains.autoevm,
        title: 'Auto EVM',
        networks: [NetworkId.TAURUS, NetworkId.LOCALHOST],
      },
      {
        name: RoutesDomains.autoid,
        title: 'Auto ID',
        networks: [],
      },
    ],
  },
  {
    name: Routes.transfer,
    title: 'Transfer',
    networks: [NetworkId.TAURUS, NetworkId.LOCALHOST],
    children: [
      {
        name: RoutesTransfer.transfer,
        title: 'Transfer',
      },
      {
        name: RoutesTransfer.history,
        title: 'Transaction History',
      },
    ],
  },
  {
    name: Routes.testnetRewards,
    title: 'Testnet Rewards',
  },
  {
    name: Routes.profile,
    title: 'Profile',
    hidden: true,
    children: [
      {
        name: RoutesProfile.profile,
        title: 'Profile',
      },
      {
        name: RoutesProfile.wallets,
        title: 'Wallets',
      },
      {
        name: RoutesProfile.apiKeys,
        title: 'API Keys',
      },
      {
        name: RoutesProfile.tags,
        title: 'Tags',
      },
    ],
  },
]

export const EXTERNAL_ROUTES = {
  autonomys: 'https://autonomys.xyz/',
  academy: 'https://academy.autonomys.xyz/',
  privacyPolicy: 'https://www.autonomys.xyz/privacy-policy',
  forum: 'https://forum.autonomys.xyz/',
  docs: 'https://docs.autonomys.xyz/',
  autoDrive: 'https://ai3.storage',
  status: 'https://status.autonomys.xyz/',
  operatorDocs: 'https://docs.autonomys.xyz/staking/operator/register',
  social: {
    twitter: 'https://x.com/AutonomysNet',
    discord: 'https://autonomys.xyz/discord',
    telegram: 'https://t.me/subspace_network',
    github: 'https://github.com/autonomys',
    reddit: 'https://www.reddit.com/r/autonomys',
    medium: 'https://medium.com/subspace-network',
    youtube: 'https://www.youtube.com/@AutonomysNetwork',
    linkedin: 'https://www.linkedin.com/company/autonomys/',
    subSocial: 'https://app.subsocial.network/@NetworkSubspace',
  },
  taurusEvmExplorer: 'https://blockscout.taurus.autonomys.xyz/',
  polkadot: (network: NetworkId): string =>
    `https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Frpc-0.${network}.subspace.network%2Fws#/explorer`,
  subscan: 'https://autonomys.subscan.io/',
  spaceAcres: 'https://api.github.com/repos/autonomys/space-acres/releases/latest',
  autoDrivePackage: 'https://www.npmjs.com/package/@autonomys/auto-drive',
  autoDagPackage: 'https://www.npmjs.com/package/@autonomys/auto-dag-data',
  autoDriveRestApi: 'https://mainnet.auto-drive.autonomys.xyz/api/docs',
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
  files: {
    id: {
      path: ':cid',
      page: (chain: string, domain: string, cid: string): string =>
        `/${chain}/${domain}/files/${cid}`,
    },
    list: 'files',
  },
  folders: {
    id: {
      path: ':cid',
      page: (chain: string, domain: string, cid: string): string =>
        `/${chain}/${domain}/folders/${cid}`,
    },
    list: 'folders',
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
    autoevm: Routes.autoevm,
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
  transfer: {
    history: 'history',
  },
  profile: {
    page: '/profile',
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
