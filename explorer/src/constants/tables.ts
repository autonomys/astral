import {
  Consensus_Accounts_Select_Column as AccountsColumns,
  Consensus_Blocks_Select_Column as BlocksColumns,
  Staking_Domains_Select_Column as DomainsColumns,
  Consensus_Events_Select_Column as EventsColumns,
  Consensus_Extrinsics_Select_Column as ExtrinsicsColumns,
  Files_Files_Select_Column as FilesColumns,
  Files_Folders_Select_Column as FoldersColumns,
  Leaderboard_Account_Extrinsic_Failed_Total_Counts_Select_Column as LeaderboardsColumns,
  Consensus_Logs_Select_Column as LogsColumns,
  Staking_Operators_Select_Column as OperatorsColumns,
} from 'gql/graphql'
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
    { name: 'sortId', label: 'Extrinsic Id', isSelected: true },
    { name: 'extrinsicHash', label: 'Extrinsic Hash', isSelected: true },
    { name: 'blockHeight', label: 'Block Height', isSelected: true },
    { name: 'module', label: 'Module', isSelected: true },
    { name: 'success', label: 'Status', isSelected: true },
    { name: 'timestamp', label: 'Time', isSelected: true },
    { name: 'hash', label: 'Block Hash', isSelected: false, searchable: true },
  ],
  events: [
    { name: 'sortId', label: 'Event Id', isSelected: true },
    { name: 'blockHeight', label: 'Block Height', isSelected: true },
    { name: 'extrinsicId', label: 'Extrinsic Id', isSelected: true },
    { name: 'module', label: 'Module', isSelected: true },
    { name: 'indexInBlock', label: 'Index in Block', isSelected: true },
    { name: 'timestamp', label: 'Time', isSelected: true },
    { name: 'hash', label: 'Block Hash', isSelected: false, searchable: true },
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
      accessorKey: FilesColumns.BlockRange,
    },
    {
      name: 'extrinsicId',
      label: 'Extrinsic Id',
      isSelected: true,
      searchable: true,
      accessorKey: 'cid.extrinsic_id',
    },
    { name: 'timestamp', label: 'Time', isSelected: true, accessorKey: FilesColumns.BlockRange },
  ],
  folders: [
    { name: 'id', label: 'CID', isSelected: true, searchable: true },
    { name: 'name', label: 'Folder Name', isSelected: true, searchable: true },
    {
      name: 'blockHeight',
      label: 'Block Height',
      isSelected: true,
      searchable: true,
      accessorKey: FoldersColumns.BlockRange,
    },
    {
      name: 'extrinsicId',
      label: 'Extrinsic Id',
      isSelected: true,
      searchable: true,
      accessorKey: 'cid.extrinsic_id',
    },
    { name: 'timestamp', label: 'Time', isSelected: true, accessorKey: FoldersColumns.BlockRange },
  ],
  domains: [
    { name: 'sortId', label: 'Id', isSelected: true, searchable: true },
    { name: 'accountId', label: 'Owner', isSelected: true, searchable: true },
    { name: 'name', label: 'Name', isSelected: true, searchable: true },
    { name: 'runtimeId', label: 'Runtime Id', isSelected: false },
    { name: 'runtime', label: 'Runtime', isSelected: true },
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
    { name: 'totalRewardsCollected', label: 'Total Rewards', isSelected: true },
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
    { name: 'lastBundleAt', label: 'Last Bundle At', isSelected: false },
    { name: 'createdAt', label: 'Created At', isSelected: false },
    { name: 'updatedAt', label: 'Updated At', isSelected: false },
  ],
  operators: [
    { name: 'sortId', label: 'Id', isSelected: true, searchable: true },
    { name: 'accountId', label: 'Owner', isSelected: true, searchable: true },
    { name: 'domainId', label: 'Domain', isSelected: false, searchable: true },
    { name: 'signingKey', label: 'Signing Key', isSelected: false, searchable: true },
    {
      name: 'minimumStake',
      label: 'Min. Stake',
      isSelected: true,
      accessorKey: 'minimum_nominator_stake',
      tooltip: 'Minimum stake required to nominate an operator',
    },
    {
      name: 'nominationTax',
      label: 'Tax',
      isSelected: true,
      tooltip: 'Nomination tax percentage collected on rewards',
    },
    { name: 'currentTotalStake', label: 'Total Stake', isSelected: true },
    {
      name: 'currentStorageFeeDeposit',
      label: 'Current Storage Fee Deposit',
      isSelected: false,
    },
    { name: 'currentTotalShares', label: 'Total Shares', isSelected: false },
    {
      name: 'yield30d',
      label: '30d Yield',
      isSelected: false,
      accessorKey: 'current_30d_yield',
      tooltip: 'Last 30 days rewards yield per 1K shares (after operator tax)',
    },
    {
      name: 'yield7d',
      label: '7d Yield',
      isSelected: false,
      accessorKey: 'current_7d_yield',
      tooltip: 'Last 7 days rewards yield per 1K shares (after operator tax)',
    },
    {
      name: 'yield1d',
      label: '1d Yield',
      isSelected: false,
      accessorKey: 'current_1d_yield',
      tooltip: 'Last 1 day rewards yield per 1K shares (after operator tax)',
    },
    {
      name: 'apy30d',
      label: '30d APY',
      isSelected: true,
      accessorKey: 'current_30d_apy',
      tooltip: 'Last 30 days rewards yield APY (after operator tax)',
    },
    {
      name: 'apy7d',
      label: '7d APY',
      isSelected: false,
      accessorKey: 'current_7d_apy',
      tooltip: 'Last 7 days rewards yield APY (after operator tax)',
    },
    {
      name: 'apy1d',
      label: '1d APY',
      isSelected: false,
      accessorKey: 'current_1d_apy',
      tooltip: 'Last 1 day rewards yield APY (after operator tax)',
    },
    { name: 'currentSharePrice', label: 'Current Share Price', isSelected: false },
    { name: 'totalDeposits', label: 'Total Deposits', isSelected: false },
    {
      name: 'totalEstimatedWithdrawals',
      label: 'Total Estimated Withdrawals',
      isSelected: false,
    },
    { name: 'totalWithdrawals', label: 'Total Withdrawals', isSelected: false },
    { name: 'totalTaxCollected', label: 'Total Tax Collected', isSelected: false },
    {
      name: 'totalRewardsCollected',
      label: 'Total Rewards',
      isSelected: true,
    },
    { name: 'bundleCount', label: 'Bundle Count', isSelected: false },
    { name: 'status', label: 'Status', isSelected: false },
    { name: 'rawStatus', label: 'Raw Status', isSelected: false },
    { name: 'lastBundleAt', label: 'Last Bundle At', isSelected: false },
    { name: 'nominatorsAggregate', label: 'Nominator Count', isSelected: false },
    { name: 'depositsCount', label: 'Deposit Count', isSelected: false },
    { name: 'withdrawalsCount', label: 'Withdrawal Count', isSelected: false },
    { name: 'createdAt', label: 'Created At', isSelected: false },
    { name: 'updatedAt', label: 'Updated At', isSelected: false },
    { name: 'myStake', label: 'My Stake', isSelected: false },
    { name: 'actions', label: 'Actions', isSelected: true },
  ],
  leaderboard: [
    { name: 'id', label: 'Id', isSelected: true, searchable: true },
    { name: 'rank', label: 'Rank', isSelected: true, searchable: true },
    { name: 'value', label: 'Value', isSelected: true, searchable: true },
    { name: 'lastContributionAt', label: 'Last Contribution', isSelected: true },
    { name: 'createdAt', label: 'Created At', isSelected: true },
    { name: 'updatedAt', label: 'Updated At', isSelected: true },
  ],
  transfers: [
    { name: 'extrinsicId', label: 'Extrinsic ID', isSelected: true, accessorKey: 'extrinsic_id' },
    {
      name: 'blockHeight',
      label: 'Block Height',
      isSelected: false,
      accessorKey: 'block_height',
    },
    { name: 'from', label: 'From', isSelected: true, searchable: true },
    { name: 'fromChain', label: 'From Chain', isSelected: true, accessorKey: 'from_chain' },
    { name: 'to', label: 'To', isSelected: true, searchable: true },
    { name: 'toChain', label: 'To Chain', isSelected: true, accessorKey: 'to_chain' },
    { name: 'value', label: 'Amount', isSelected: true },
    {
      name: 'fee',
      label: 'Fee',
      isSelected: true,
      tooltip: 'Transaction fee paid to the network for processing this transfer',
    },
    {
      name: 'success',
      label: 'Status',
      isSelected: true,
      tooltip: 'Whether the transfer was Successful/Failed/In Progress',
    },
    { name: 'timestamp', label: 'Time', isSelected: true },
    { name: 'blockHash', label: 'Block Hash', isSelected: false, accessorKey: 'block_hash' },
    { name: 'id', label: 'ID', isSelected: false },
    { name: 'eventId', label: 'Event ID', isSelected: false, accessorKey: 'event_id' },
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
  extrinsics: [],
  events: [],
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
    {
      type: 'range',
      label: 'Min. Stake',
      key: 'minimumNominatorStake',
    },
    { type: 'range', label: 'Nomination Tax', key: 'nominationTax' },
    { type: 'range', label: 'Total Stake', key: 'totalStake' },
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
  transfers: [
    { type: 'dropdown', label: 'From Chain', key: 'fromChain', options: ['consensus', 'domain:0'] },
    { type: 'dropdown', label: 'To Chain', key: 'toChain', options: ['consensus', 'domain:0'] },
    {
      type: 'dropdown',
      label: 'Status',
      key: 'success',
      options: [
        { value: 'true', label: 'Success' },
        { value: 'false', label: 'Failed' },
      ],
    },
    { type: 'text', label: 'Block', key: 'blockHeight' },
    { type: 'range', label: 'Amount', key: 'value' },
    { type: 'range', label: 'Fee', key: 'fee' },
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
        id: AccountsColumns.Total,
        desc: true,
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
        id: BlocksColumns.SortId,
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
      module: '',
    },
    sorting: [
      {
        id: ExtrinsicsColumns.SortId,
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
        id: EventsColumns.SortId,
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
        id: LogsColumns.SortId,
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
      id: '',
      name: '',
      blockHeightMin: '',
      blockHeightMax: '',
    },
    sorting: [
      {
        id: FilesColumns.BlockRange,
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
      id: '',
      name: '',
      blockHeightMin: '',
      blockHeightMax: '',
    },
    sorting: [
      {
        id: FoldersColumns.BlockRange,
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
        id: DomainsColumns.SortId,
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
        id: OperatorsColumns.SortId,
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
        id: LeaderboardsColumns.Rank,
        desc: false,
      },
    ],
  },
  transfers: {
    ...INITIAL_TABLE_PROPERTIES,
    name: 'transfers',
    columns: AVAILABLE_COLUMNS.transfers,
    selectedColumns: AVAILABLE_COLUMNS.transfers
      .filter((column) => column.isSelected)
      .map((column) => column.name),
    filtersOptions: FILTERS_OPTIONS.transfers,
    filters: {
      valueMin: '',
      valueMax: '',
      fromChain: '',
      toChain: '',
      success: '',
      feeMin: '',
      feeMax: '',
      status: '',
    },
    sorting: [
      {
        id: 'timestamp',
        desc: true,
      },
    ],
  },
}
