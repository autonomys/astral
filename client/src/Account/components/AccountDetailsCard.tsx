import { FC } from 'react'
import Identicon from '@polkadot/react-identicon'

// gql
import { Account } from 'gql/graphql'

// common
import { Accordion, CopyButton, List, StyledListItem } from 'common/components'
import { shortString } from 'common/helpers'
import { accountIdToHex } from 'common/helpers/formatAddress'

type Props = {
  account: Account
  accountAddress: string
  isDesktop?: boolean
}

const AccountDetailsCard: FC<Props> = ({ account, accountAddress, isDesktop = false }) => {
  const publicKey = accountIdToHex(accountAddress)
  return (
    <div className='border border-slate-100 bg-white shadow rounded-[20px] mb-4 md:p-4 p-6 dark:bg-gradient-to-r dark:from-[#4141B3] dark:via-[#6B5ACF] dark:to-[#896BD2] dark:border-none'>
      <div className='flex items-center gap-3 w-full'>
        <Accordion
          title={
            <div className='w-full flex items-center gap-3'>
              <Identicon value={accountAddress} size={48} theme='beachball' />
              <CopyButton value={accountAddress} message='Address copied'>
                <h3 className='font-medium leading-none text-[#282929] text-sm break-all dark:text-white'>
                  {accountAddress}
                </h3>
              </CopyButton>
            </div>
          }
        >
          <List>
            <StyledListItem title='Public key'>
              <CopyButton value={publicKey.toString()} message='Public key copied'>
                {!isDesktop ? shortString(publicKey) : publicKey}
              </CopyButton>
            </StyledListItem>
            <StyledListItem title='Nonce'>{account.updatedAt}</StyledListItem>
          </List>
        </Accordion>
      </div>
    </div>
  )
}

export default AccountDetailsCard
