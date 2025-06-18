import { shortString } from '@autonomys/auto-utils'
import { IconTheme } from '@polkadot/react-identicon/types'
import { INTERNAL_ROUTES } from 'constants/routes'
import useMediaQuery from 'hooks/useMediaQuery'
import Link from 'next/link'
import { FC } from 'react'
import { DynamicIdenticon } from 'utils/dynamicImports'
import { isAddress } from 'utils/ethers-utils'

interface AccountIconProps {
  address: string
  isAlternative?: boolean
  isHighlight?: boolean
  onCopy?: (value: string) => void
  size?: number
  theme?: IconTheme
}

export const AccountIcon: FC<AccountIconProps> = ({
  address,
  isAlternative,
  isHighlight,
  onCopy,
  size = 48,
  theme = 'beachball',
}) => {
  return (
    <DynamicIdenticon
      isAlternative={isAlternative}
      isHighlight={isHighlight}
      onCopy={onCopy}
      size={size}
      theme={theme}
      value={address}
    />
  )
}

export const AccountIconWithLink = ({
  address,
  network,
  section,
  link,
  forceShortString = false,
  ...props
}: AccountIconProps & {
  network: string
  section: string
  link?: string
  forceShortString?: boolean
}) => {
  const isDesktop = useMediaQuery('(min-width: 1440px)')
  const isEthereumAddress = isAddress(address)
  return (
    <div className='flex items-center gap-2'>
      {!isEthereumAddress ? (
        <>
          <AccountIcon address={address} size={26} theme='beachball' {...props} />
          <Link
            href={link ?? INTERNAL_ROUTES.accounts.id.page(network, section, address)}
            className='hover:text-primaryAccent'
          >
            <div>{!isDesktop || forceShortString ? shortString(address) : address}</div>
          </Link>
        </>
      ) : (
        <>
          <AccountIcon address={address} size={26} theme='ethereum' {...props} />
          <div>{address}</div>
        </>
      )}
    </div>
  )
}
