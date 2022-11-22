// TODO: Update routes for forum and docs
export const EXTERNAL_ROUTES = {
  subspace: 'https://subspace.network/',
  forum: 'https://subspace.network/',
  docs: 'https://subspace.network/',
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
    list: 'events',
  },
  extrinsics: {
    id: {
      path: ':extrinsicId',
      page: (extrinsicId: string): string => `/extrinsics/${extrinsicId}`,
    },
    list: 'extrinsics',
  },
}
