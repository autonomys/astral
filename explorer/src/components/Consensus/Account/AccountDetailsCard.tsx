import { Accordion } from 'components/common/Accordion'
import { CopyButton } from 'components/common/CopyButton'
import { List, StyledListItem } from 'components/common/List'
import { Routes } from 'constants/routes'
import { Account } from 'gql/graphql'
import useChains from 'hooks/useChains'
import { FC } from 'react'
import { accountIdToHex } from 'utils//formatAddress'
import { shortString } from 'utils/string'
import { AccountIcon } from '../../common/AccountIcon'

type Props = {
  account: Account | undefined
  accountAddress: string
  isDesktop?: boolean
}

export const AccountDetailsCard: FC<Props> = ({ account, accountAddress, isDesktop = false }) => {
  const publicKey = accountIdToHex(accountAddress)
  const { section } = useChains()

  const theme = section === Routes.nova ? 'ethereum' : 'beachball'
  return (
    <div className='mb-4 rounded-[20px] border border-slate-100 bg-white p-6 shadow dark:border-none dark:bg-gradient-to-r dark:from-gradientTwilight dark:via-gradientDusk dark:to-gradientSunset md:p-4'>
      <div className='flex w-full items-center gap-3'>
        <Accordion
          title={
            <div className='flex w-full items-center gap-3'>
              <AccountIcon address={accountAddress} theme={theme} />

              <h3 className='break-all text-sm font-medium leading-none text-grayDark dark:text-white'>
                {accountAddress}
              </h3>
            </div>
          }
        >
          <List>
            <StyledListItem title='Account Id'>
              <CopyButton value={accountAddress.toString()} message='Account Id copied'>
                {!isDesktop ? shortString(accountAddress) : accountAddress}
              </CopyButton>
            </StyledListItem>
            <StyledListItem title='Public key'>
              <CopyButton value={publicKey.toString()} message='Public key copied'>
                {!isDesktop ? shortString(publicKey) : publicKey}
              </CopyButton>
            </StyledListItem>
            {account && <StyledListItem title='Nonce'>{account.nonce}</StyledListItem>}
          </List>
        </Accordion>
      </div>
    </div>
  )
}
