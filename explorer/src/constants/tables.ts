import { AvailableColumns, FiltersOptions, InitialTables } from 'types/table'
import { allCapsToNormal } from 'utils/string'
import { PAGE_SIZE } from './general'
import { OperatorStatus } from './staking'

export const AVAILABLE_COLUMNS: AvailableColumns = {
  accounts: [
    { name: 'id', label: 'Account', isSelected: true, searchable: true },
    { name: 'nonce', label: 'Nonce', isSelected: true },
    { name: 'free', label: 'Free', isSelected: true },
    { name: 'reserved', label: 'Locked', isSelected: true },
    { name: 'total', label: 'Balance', isSelected: true },
    { name: 'createdAt', label: 'Created At', isSelected: false },
    { name: 'updatedAt', label: 'Updated At', isSelected: false },
  ],
  blocks: [
    { name: 'sortId', label: 'Block number', isSelected: true, searchable: true },
    { name: 'hash', label: 'Hash', isSelected: true, searchable: true },
    { name: 'timestamp', label: 'Time', isSelected: true },
    { name: 'parentHash', label: 'Parent Hash', isSelected: false, searchable: true },
    { name: 'specId', label: 'Spec Id', isSelected: false },
    { name: 'stateRoot', label: 'State Root', isSelected: false },
    { name: 'extrinsicsRoot', label: 'Extrinsics Root', isSelected: false },
    { name: 'spacePledged', label: 'Space Pledged', isSelected: true },
    { name: 'blockchainSize', label: 'Blockchain Size', isSelected: false },
    { name: 'extrinsicsCount', label: 'Extrinsics', isSelected: true },
    { name: 'eventsCount', label: 'Events', isSelected: true },
    { name: 'authorId', label: 'Block Author', isSelected: true, searchable: true },
  ],
  extrinsics: [
    { name: 'sortId', label: 'Extrinsic Id', isSelected: true, searchable: true },
    { name: 'hash', label: 'Extrinsic Hash', isSelected: true, searchable: true },
    { name: 'blockHeight', label: 'Block Height', isSelected: true, searchable: true },
    { name: 'blockHash', label: 'Block Hash', isSelected: false, searchable: true },
    { name: 'section', label: 'Section', isSelected: false, searchable: true },
    { name: 'module', label: 'Module', isSelected: true, searchable: true },
    { name: 'indexInBlock', label: 'Index in Block', isSelected: false },
    { name: 'success', label: 'Status', isSelected: true, searchable: true },
    { name: 'timestamp', label: 'Time', isSelected: true },
    { name: 'nonce', label: 'Nonce', isSelected: false },
    { name: 'signer', label: 'Signer', isSelected: false, searchable: true },
    { name: 'signature', label: 'Signature', isSelected: false },
    { name: 'tip', label: 'Tip', isSelected: false },
    { name: 'fee', label: 'Fee', isSelected: false },
  ],
  events: [
    { name: 'sortId', label: 'Event Id', isSelected: true, searchable: true },
    { name: 'blockHeight', label: 'Block Height', isSelected: true, searchable: true },
    { name: 'blockHash', label: 'Block Hash', isSelected: false, searchable: true },
    { name: 'extrinsicId', label: 'Extrinsic Id', isSelected: true, searchable: true },
    { name: 'extrinsicHash', label: 'Extrinsic Hash', isSelected: false, searchable: true },
    { name: 'section', label: 'Section', isSelected: true, searchable: true },
    { name: 'module', label: 'Module', isSelected: true, searchable: true },
    { name: 'indexInBlock', label: 'Index in Block', isSelected: true },
    { name: 'timestamp', label: 'Time', isSelected: true },
  ],
  logs: [
    { name: 'sortId', label: 'Log Id', isSelected: true, searchable: true },
    { name: 'blockHeight', label: 'Block Height', isSelected: true, searchable: true },
    { name: 'blockHash', label: 'Block Hash', isSelected: true, searchable: true },
    { name: 'indexInBlock', label: 'Index in Block', isSelected: true },
    { name: 'kind', label: 'Kind', isSelected: true, searchable: true },
    { name: 'timestamp', label: 'Time', isSelected: true },
  ],
  files: [
    { name: 'id', label: 'CID', isSelected: true, searchable: true },
    { name: 'name', label: 'File Name', isSelected: true, searchable: true },
    {
      name: 'blockHeight',
      label: 'Block Height',
      isSelected: true,
      searchable: true,
      accessorKey: 'cid.block_height',
    },
    {
      name: 'extrinsicId',
      label: 'Extrinsic Id',
      isSelected: true,
      searchable: true,
      accessorKey: 'cid.extrinsic_id',
    },
    { name: 'timestamp', label: 'Time', isSelected: true, accessorKey: 'cid.timestamp' },
  ],
  folders: [
    { name: 'id', label: 'CID', isSelected: true, searchable: true },
    { name: 'name', label: 'Folder Name', isSelected: true, searchable: true },
    {
      name: 'blockHeight',
      label: 'Block Height',
      isSelected: true,
      searchable: true,
      accessorKey: 'cid.block_height',
    },
    {
      name: 'extrinsicId',
      label: 'Extrinsic Id',
      isSelected: true,
      searchable: true,
      accessorKey: 'cid.extrinsic_id',
    },
    { name: 'timestamp', label: 'Time', isSelected: true, accessorKey: 'cid.timestamp' },
  ],
  domains: [
    { name: 'id', label: 'Id', isSelected: true, searchable: true },
    { name: 'accountId', label: 'Owner', isSelected: true, searchable: true },
    { name: 'name', label: 'Name', isSelected: true, searchable: true },
    { name: 'runtimeId', label: 'Runtime Id', isSelected: false },
    { name: 'runtime', label: 'Runtime', isSelected: true },
    { name: 'runtimeInfo', label: 'Runtime Info', isSelected: false },
    { name: 'completedEpoch', label: 'Completed Epoch', isSelected: true },
    { name: 'lastDomainBlockNumber', label: 'Last Domain Block Number', isSelected: false },
    { name: 'totalDeposits', label: 'Total Deposits', isSelected: true },
    {
      name: 'totalEstimatedWithdrawals',
      label: 'Total Estimated Withdrawals',
      isSelected: false,
    },
    { name: 'totalWithdrawals', label: 'Total Withdrawals', isSelected: false },
    { name: 'totalTaxCollected', label: 'Total Tax Collected', isSelected: false },
    { name: 'totalRewardsCollected', label: 'Total Rewards Collected', isSelected: true },
    { name: 'totalTransfersIn', label: 'Total Transfers In', isSelected: false },
    { name: 'transfersInCount', label: 'Transfers In Count', isSelected: false },
    { name: 'totalTransfersOut', label: 'Total Transfers Out', isSelected: false },
    { name: 'transfersOutCount', label: 'Transfers Out Count', isSelected: false },
    {
      name: 'totalRejectedTransfersClaimed',
      label: 'Total Rejected Transfers Claimed',
      isSelected: false,
    },
    {
      name: 'rejectedTransfersClaimedCount',
      label: 'Rejected Transfers Claimed Count',
      isSelected: false,
    },
    { name: 'totalTransfersRejected', label: 'Total Transfers Rejected', isSelected: false },
    { name: 'transfersRejectedCount', label: 'Transfers Rejected Count', isSelected: false },
    { name: 'totalVolume', label: 'Total Volume', isSelected: true },
    {
      name: 'totalConsensusStorageFee',
      label: 'Total Consensus Storage Fee',
      isSelected: false,
    },
    { name: 'totalDomainExecutionFee', label: 'Total Domain Execution Fee', isSelected: false },
    { name: 'totalBurnedBalance', label: 'Total Burned Balance', isSelected: false },
    { name: 'currentTotalStake', label: 'Current Total Stake', isSelected: true },
    {
      name: 'currentStorageFeeDeposit',
      label: 'Current Storage Fee Deposit',
      isSelected: false,
    },
    { name: 'currentTotalShares', label: 'Current Total Shares', isSelected: false },
    { name: 'currentSharePrice', label: 'Current Share Price', isSelected: false },
    { name: 'accumulatedEpochStake', label: 'Accumulated Epoch Stake', isSelected: false },
    {
      name: 'accumulatedEpochStorageFeeDeposit',
      label: 'Accumulated Epoch Storage Fee Deposit',
      isSelected: false,
    },
    { name: 'accumulatedEpochRewards', label: 'Accumulated Epoch Rewards', isSelected: false },
    { name: 'accumulatedEpochShares', label: 'Accumulated Epoch Shares', isSelected: false },
    { name: 'bundleCount', label: 'Bundle Count', isSelected: true },
    { name: 'currentEpochDuration', label: 'Current Epoch Duration', isSelected: false },
    { name: 'lastEpochDuration', label: 'Last Epoch Duration', isSelected: false },
    { name: 'last6EpochsDuration', label: 'Last 6 Epochs Duration', isSelected: false },
    { name: 'last144EpochDuration', label: 'Last 144 Epoch Duration', isSelected: false },
    { name: 'last1kEpochDuration', label: 'Last 1K Epoch Duration', isSelected: false },
    { name: 'lastBundleAt', label: 'Last Bundle At', isSelected: false },
    { name: 'createdAt', label: 'Created At', isSelected: false },
    { name: 'updatedAt', label: 'Updated At', isSelected: false },
  ],
  operators: [
    { name: 'id', label: 'Id', isSelected: true, searchable: true },
    { name: 'accountId', label: 'Owner', isSelected: true, searchable: true },
    { name: 'domainId', label: 'Domain', isSelected: true, searchable: true },
    { name: 'signingKey', label: 'Signing Key', isSelected: true, searchable: true },
    { name: 'minimumNominatorStake', label: 'Minimum Nominator Stake', isSelected: true },
    { name: 'nominationTax', label: 'Nomination Tax', isSelected: true },
    // { name: 'name', label: 'Name', isSelected: true },
    // { name: 'description', label: 'Description', isSelected: false },
    // { name: 'icon', label: 'Icon', isSelected: false },
    // { name: 'banner', label: 'Banner', isSelected: false },
    // { name: 'website', label: 'Website', isSelected: false },
    // { name: 'website_verified', label: 'Website Verified', isSelected: false },
    // { name: 'email', label: 'Email', isSelected: false },
    // { name: 'email_verified', label: 'Email Verified', isSelected: false },
    // { name: 'discord', label: 'Discord', isSelected: false },
    // { name: 'github', label: 'Github', isSelected: false },
    // { name: 'twitter', label: 'Twitter', isSelected: false },
    { name: 'currentTotalStake', label: 'Total Stake', isSelected: true },
    {
      name: 'currentStorageFeeDeposit',
      label: 'Current Storage Fee Deposit',
      isSelected: false,
    },
    { name: 'currentEpochRewards', label: 'Current Epoch Rewards', isSelected: false },
    { name: 'currentTotalShares', label: 'Total Shares', isSelected: false },
    { name: 'currentSharePrice', label: 'Current Share Price', isSelected: false },
    { name: 'totalDeposits', label: 'Total Deposits', isSelected: false },
    {
      name: 'totalEstimatedWithdrawals',
      label: 'Total Estimated Withdrawals',
      isSelected: false,
    },
    { name: 'totalWithdrawals', label: 'Total Withdrawals', isSelected: false },
    { name: 'totalTaxCollected', label: 'Total Tax Collected', isSelected: false },
    { name: 'totalRewardsCollected', label: 'Total Rewards Collected', isSelected: true },
    { name: 'totalTransfersIn', label: 'Total Transfers In', isSelected: false },
    { name: 'transfersInCount', label: 'Transfers In Count', isSelected: false },
    { name: 'totalTransfersOut', label: 'Total Transfers Out', isSelected: false },
    { name: 'transfersOutCount', label: 'Transfers Out Count', isSelected: false },
    {
      name: 'totalRejectedTransfersClaimed',
      label: 'Total Rejected Transfers Claimed',
      isSelected: false,
    },
    {
      name: 'rejectedTransfersClaimedCount',
      label: 'Rejected Transfers Claimed Count',
      isSelected: false,
    },
    { name: 'totalTransfersRejected', label: 'Total Transfers Rejected', isSelected: false },
    { name: 'transfersRejectedCount', label: 'Transfers Rejected Count', isSelected: false },
    { name: 'totalVolume', label: 'Total Volume', isSelected: false },
    {
      name: 'totalConsensusStorageFee',
      label: 'Total Consensus Storage Fee',
      isSelected: false,
    },
    { name: 'totalDomainExecutionFee', label: 'Total Domain Execution Fee', isSelected: false },
    { name: 'totalBurnedBalance', label: 'Total Burned Balance', isSelected: false },
    { name: 'accumulatedEpochStake', label: 'Accumulated Epoch Stake', isSelected: false },
    {
      name: 'accumulatedEpochStorageFeeDeposit',
      label: 'Accumulated Epoch Storage Fee Deposit',
      isSelected: false,
    },
    { name: 'accumulatedEpochRewards', label: 'Accumulated Epoch Rewards', isSelected: false },
    { name: 'accumulatedEpochShares', label: 'Accumulated Epoch Shares', isSelected: false },
    { name: 'activeEpochCount', label: 'Active Epoch Count', isSelected: false },
    { name: 'bundleCount', label: 'Bundle Count', isSelected: false },
    { name: 'status', label: 'Status', isSelected: true },
    { name: 'rawStatus', label: 'Raw Status', isSelected: false },
    { name: 'pendingAction', label: 'Pending Action', isSelected: false },
    { name: 'lastBundleAt', label: 'Last Bundle At', isSelected: false },
    { name: 'nominatorsAggregate', label: 'Nominator Count', isSelected: false },
    { name: 'depositsAggregate', label: 'Deposit Count', isSelected: false },
    { name: 'createdAt', label: 'Created At', isSelected: false },
    { name: 'updatedAt', label: 'Updated At', isSelected: false },
  ],
  leaderboard: [
    { name: 'id', label: 'Id', isSelected: true, searchable: true },
    { name: 'rank', label: 'Rank', isSelected: true, searchable: true },
    { name: 'value', label: 'Value', isSelected: true, searchable: true },
    { name: 'lastContributionAt', label: 'Last Contribution', isSelected: true },
    { name: 'createdAt', label: 'Created At', isSelected: true },
    { name: 'updatedAt', label: 'Updated At', isSelected: true },
  ],
}

export const FILTERS_OPTIONS: FiltersOptions = {
  accounts: [
    { type: 'range', label: 'Nonce', key: 'nonce' },
    { type: 'range', label: 'Free', key: 'free' },
    { type: 'range', label: 'Reserved', key: 'reserved' },
    { type: 'range', label: 'Total', key: 'total' },
  ],
  blocks: [
    { type: 'range', label: 'Height', key: 'height' },
    { type: 'range', label: 'Space Pledged', key: 'spacePledged' },
    { type: 'range', label: 'Blockchain Size', key: 'blockchainSize' },
  ],
  extrinsics: [
    { type: 'range', label: 'Block Height', key: 'blockHeight' },
    { type: 'text', label: 'Section', key: 'section' },
    { type: 'text', label: 'Module', key: 'module' },
  ],
  events: [
    { type: 'range', label: 'Block Height', key: 'blockHeight' },
    { type: 'text', label: 'Section', key: 'section' },
    { type: 'text', label: 'Module', key: 'module' },
  ],
  logs: [
    { type: 'range', label: 'Block Height', key: 'blockHeight' },
    { type: 'text', label: 'Kind', key: 'kind' },
  ],
  files: [
    { type: 'text', label: 'CID', key: 'id' },
    { type: 'text', label: 'File Name', key: 'name' },
    { type: 'range', label: 'Block Height', key: 'blockHeight' },
  ],
  folders: [
    { type: 'text', label: 'CID', key: 'id' },
    { type: 'text', label: 'Folder Name', key: 'name' },
    { type: 'range', label: 'Block Height', key: 'blockHeight' },
  ],
  domains: [
    { type: 'range', label: 'Total Stake', key: 'totalStake' },
    { type: 'range', label: 'Total Deposits', key: 'totalDeposits' },
    { type: 'range', label: 'Total Rewards Collected', key: 'totalRewardsCollected' },
    { type: 'range', label: 'Deposit Count', key: 'depositsCount' },
    { type: 'range', label: 'Completed Epoch', key: 'completedEpoch' },
    { type: 'range', label: 'Bundle Count', key: 'bundleCount' },
  ],
  operators: [
    { type: 'range', label: 'Total Stake', key: 'totalStake' },
    { type: 'range', label: 'Nomination Tax', key: 'nominationTax' },
    { type: 'range', label: 'Minimum Nominator Stake', key: 'minimumNominatorStake' },
    { type: 'range', label: 'Total Rewards Collected', key: 'totalRewardsCollected' },
    { type: 'range', label: 'Nominator Count', key: 'nominatorsCount' },
    { type: 'range', label: 'Deposit Count', key: 'depositsCount' },
    {
      type: 'checkbox',
      label: 'Status',
      key: 'status',
      options: Object.values(OperatorStatus).map((status) => allCapsToNormal(status)),
    },
    { type: 'range', label: 'Active Epoch Count', key: 'activeEpochCount' },
    { type: 'range', label: 'Bundle Count', key: 'bundleCount' },
  ],
  leaderboard: [
    { type: 'range', label: 'Rank', key: 'rank' },
    { type: 'range', label: 'Value', key: 'value' },
  ],
}

const INITIAL_TABLE_PROPERTIES = {
  filters: {},
  pagination: {
    pageSize: PAGE_SIZE,
    pageIndex: 0,
  },
  showTableSettings: null,
}

export const INITIAL_TABLES: InitialTables = {
  accounts: {
    ...INITIAL_TABLE_PROPERTIES,
    name: 'accounts',
    columns: AVAILABLE_COLUMNS.accounts,
    selectedColumns: AVAILABLE_COLUMNS.accounts
      .filter((column) => column.isSelected)
      .map((column) => column.name),
    filtersOptions: FILTERS_OPTIONS.accounts,
    filters: {
      nonceMin: '',
      nonceMax: '',
      freeMin: '',
      freeMax: '',
      reservedMin: '',
      reservedMax: '',
      totalMin: '',
      totalMax: '',
    },
    sorting: [
      {
        id: 'id',
        desc: false,
      },
    ],
  },
  blocks: {
    ...INITIAL_TABLE_PROPERTIES,
    name: 'blocks',
    columns: AVAILABLE_COLUMNS.blocks,
    selectedColumns: AVAILABLE_COLUMNS.blocks
      .filter((column) => column.isSelected)
      .map((column) => column.name),
    filtersOptions: FILTERS_OPTIONS.blocks,
    filters: {
      heightMin: '',
      heightMax: '',
      spacePledgedMin: '',
      spacePledgedMax: '',
      blockchainSizeMin: '',
      blockchainSizeMax: '',
    },
    sorting: [
      {
        id: 'sort_id',
        desc: true,
      },
    ],
  },
  extrinsics: {
    ...INITIAL_TABLE_PROPERTIES,
    name: 'extrinsics',
    columns: AVAILABLE_COLUMNS.extrinsics,
    selectedColumns: AVAILABLE_COLUMNS.extrinsics
      .filter((column) => column.isSelected)
      .map((column) => column.name),
    filtersOptions: FILTERS_OPTIONS.extrinsics,
    filters: {
      blockHeightMin: '',
      blockHeightMax: '',
      section: '',
      module: '',
    },
    sorting: [
      {
        id: 'sort_id',
        desc: true,
      },
    ],
  },
  events: {
    ...INITIAL_TABLE_PROPERTIES,
    name: 'events',
    columns: AVAILABLE_COLUMNS.events,
    selectedColumns: AVAILABLE_COLUMNS.events
      .filter((column) => column.isSelected)
      .map((column) => column.name),
    filtersOptions: FILTERS_OPTIONS.events,
    filters: {
      blockHeightMin: '',
      blockHeightMax: '',
      section: '',
      module: '',
    },
    sorting: [
      {
        id: 'sort_id',
        desc: true,
      },
    ],
  },
  logs: {
    ...INITIAL_TABLE_PROPERTIES,
    name: 'logs',
    columns: AVAILABLE_COLUMNS.logs,
    selectedColumns: AVAILABLE_COLUMNS.logs
      .filter((column) => column.isSelected)
      .map((column) => column.name),
    filtersOptions: FILTERS_OPTIONS.logs,
    filters: {
      blockHeightMin: '',
      blockHeightMax: '',
      kind: '',
    },
    sorting: [
      {
        id: 'sort_id',
        desc: true,
      },
    ],
  },
  files: {
    ...INITIAL_TABLE_PROPERTIES,
    name: 'files',
    columns: AVAILABLE_COLUMNS.files,
    selectedColumns: AVAILABLE_COLUMNS.files
      .filter((column) => column.isSelected)
      .map((column) => column.name),
    filtersOptions: FILTERS_OPTIONS.files,
    filters: {
      cid: '',
      name: '',
      blockHeightMin: '',
      blockHeightMax: '',
    },
    sorting: [
      {
        id: 'cid_timestamp',
        desc: true,
      },
    ],
  },
  folders: {
    ...INITIAL_TABLE_PROPERTIES,
    name: 'folders',
    columns: AVAILABLE_COLUMNS.folders,
    selectedColumns: AVAILABLE_COLUMNS.folders
      .filter((column) => column.isSelected)
      .map((column) => column.name),
    filtersOptions: FILTERS_OPTIONS.folders,
    filters: {
      cid: '',
      name: '',
      blockHeightMin: '',
      blockHeightMax: '',
    },
    sorting: [
      {
        id: 'cid_timestamp',
        desc: true,
      },
    ],
  },
  domains: {
    ...INITIAL_TABLE_PROPERTIES,
    name: 'domains',
    columns: AVAILABLE_COLUMNS.domains,
    selectedColumns: AVAILABLE_COLUMNS.domains
      .filter((column) => column.isSelected)
      .map((column) => column.name),
    filtersOptions: FILTERS_OPTIONS.domains,
    filters: {
      totalStakeMin: '',
      totalStakeMax: '',
      totalDepositsMin: '',
      totalDepositsMax: '',
      totalRewardsCollectedMin: '',
      totalRewardsCollectedMax: '',
      depositsCountMin: '',
      depositsCountMax: '',
      completedEpochMin: '',
      completedEpochMax: '',
      bundleCountMin: '',
      bundleCountMax: '',
    },
    sorting: [
      {
        id: 'id',
        desc: false,
      },
    ],
  },
  operators: {
    ...INITIAL_TABLE_PROPERTIES,
    name: 'operators',
    columns: AVAILABLE_COLUMNS.operators,
    selectedColumns: AVAILABLE_COLUMNS.operators
      .filter((column) => column.isSelected)
      .map((column) => column.name),
    filtersOptions: FILTERS_OPTIONS.operators,
    filters: {
      totalStakeMin: '',
      totalStakeMax: '',
      nominationTaxMin: '',
      nominationTaxMax: '',
      minimumNominatorStakeMin: '',
      minimumNominatorStakeMax: '',
      totalRewardsCollectedMin: '',
      totalRewardsCollectedMax: '',
      nominatorsCountMin: '',
      nominatorsCountMax: '',
      statusRegistered: '',
      statusDeregistered: '',
      statusSlashed: '',
      activeEpochCountMin: '',
      activeEpochCountMax: '',
      bundleCountMin: '',
      bundleCountMax: '',
    },
    sorting: [
      {
        id: 'id',
        desc: false,
      },
    ],
  },
  leaderboard: {
    ...INITIAL_TABLE_PROPERTIES,
    name: 'leaderboard',
    columns: AVAILABLE_COLUMNS.leaderboard,
    selectedColumns: AVAILABLE_COLUMNS.leaderboard
      .filter((column) => column.isSelected)
      .map((column) => column.name),
    filtersOptions: FILTERS_OPTIONS.leaderboard,
    filters: {
      rankMin: '',
      rankMax: '',
      valueMin: '',
      valueMax: '',
    },
    sorting: [
      {
        id: 'rank',
        desc: false,
      },
    ],
  },
}
