import { FC } from 'react'
import Identicon from '@polkadot/react-identicon'

// gql
import { Account } from 'gql/graphql'

// common
import { Accordion, List, ListItem, StyledListItem } from 'common/components'
import { bigNumberToNumber, shortString } from 'common/helpers'

// account
import { AccountBalanceStats } from 'Account/components'

type Props = {
  account: Account
}

const AccountDetailsCard: FC<Props> = ({ account }) => {
  const accountTotal = account.total ? bigNumberToNumber(account.total, 18) : 0
  return (
    <div className='border border-slate-100 bg-white shadow rounded-[20px] mb-4 p-4 sm:p-6 dark:bg-gradient-to-r dark:from-[#4141B3] dark:via-[#6B5ACF] dark:to-[#896BD2] dark:border-none'>
      <div className='flex items-center justify-between mb-10 gap-3'>
        <Identicon value={account.id} size={48} theme='beachball' />
        <h3 className='font-medium leading-none text-[#282929] text-sm break-all dark:text-white'>{account.id}</h3>
      </div>
      <div className='flow-root'>
        <List>
          <StyledListItem title='Public key'>{shortString(account.id)}</StyledListItem>
          <StyledListItem title='Account index'>-</StyledListItem>
          <StyledListItem title='Nonce'>{account.updatedAt}</StyledListItem>
          <ListItem>
            <Accordion title='Balance' value={`${accountTotal}`}>
              <AccountBalanceStats account={account} />
            </Accordion>
          </ListItem>
        </List>
      </div>
    </div>
  )
}

export default AccountDetailsCard
