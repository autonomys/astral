import Accordion from 'common/components/Accordion'
import { List, ListItem, StyledListItem } from 'common/components/List'
import { bigNumberToNumber, shortString } from 'common/helpers'
import { Account } from 'gql/graphql'
import { FC } from 'react'
import AccountBalanceStats from './AccountBalanceStats'

type Props = {
  account: Account
}

const AccountDetailsCard: FC<Props> = ({ account }) => {
  const accountTotal = bigNumberToNumber(account.total || 0, 18)
  return (
    <div className='border border-slate-100 bg-white shadow rounded-lg mb-4 p-4 sm:p-6'>
      <div className='flex items-center justify-between mb-10'>
        <h3 className='font-medium leading-none text-[#282929] text-sm break-all'>{account.id}</h3>
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
