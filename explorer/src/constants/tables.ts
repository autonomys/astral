import { AvailableColumns, InitialTables } from 'types/table'
import { PAGE_SIZE } from './general'

export const AVAILABLE_COLUMNS: AvailableColumns = {
  operators: [
    { name: 'id', label: 'Id', isSelected: true },
    { name: 'account_id', label: 'Owner', isSelected: false },
    { name: 'domain_id', label: 'Domain', isSelected: true },
    { name: 'signing_key', label: 'Signing Key', isSelected: true },
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
    { name: 'current_total_stake', label: 'Total Stake', isSelected: true },
    { name: 'current_total_shares', label: 'Total Shares', isSelected: false },
    { name: 'total_deposits', label: 'Total Deposits', isSelected: false },
    { name: 'total_tax_collected', label: 'Total Tax Collected', isSelected: false },
    { name: 'total_rewards_collected', label: 'Total Rewards Collected', isSelected: false },
    { name: 'total_transfers_in', label: 'Total Transfers In', isSelected: false },
    { name: 'transfers_in_count', label: 'Transfers In Count', isSelected: false },
    { name: 'total_transfers_out', label: 'Total Transfers Out', isSelected: false },
    { name: 'transfers_out_count', label: 'Transfers Out Count', isSelected: false },
    {
      name: 'total_rejected_transfers_claimed',
      label: 'Total Rejected Transfers Claimed',
      isSelected: false,
    },
    {
      name: 'rejected_transfers_claimed_count',
      label: 'Rejected Transfers Claimed Count',
      isSelected: false,
    },
    { name: 'total_transfers_rejected', label: 'Total Transfers Rejected', isSelected: false },
    { name: 'transfers_rejected_count', label: 'Transfers Rejected Count', isSelected: false },
    { name: 'total_volume', label: 'Total Volume', isSelected: false },
    {
      name: 'total_consensus_storage_fee',
      label: 'Total Consensus Storage Fee',
      isSelected: false,
    },
    { name: 'total_domain_execution_fee', label: 'Total Domain Execution Fee', isSelected: false },
    { name: 'total_burned_balance', label: 'Total Burned Balance', isSelected: false },
    { name: 'active_epoch_count', label: 'Active Epoch Count', isSelected: false },
    { name: 'bundle_count', label: 'Bundle Count', isSelected: false },
    { name: 'status', label: 'Status', isSelected: true },
    { name: 'last_bundle_at', label: 'Last Bundle At', isSelected: false },
    { name: 'created_at', label: 'Created At', isSelected: false },
    { name: 'updated_at', label: 'Updated At', isSelected: false },
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
  operators: {
    ...INITIAL_TABLE_PROPERTIES,
    name: 'operators',
    columns: AVAILABLE_COLUMNS.operators,
    selectedColumns: AVAILABLE_COLUMNS.operators
      .filter((column) => column.isSelected)
      .map((column) => column.name),
    sorting: [
      {
        id: 'id',
        desc: false,
      },
    ],
  },
}
