import Identicon from '@polkadot/react-identicon'
import { IconTheme } from '@polkadot/react-identicon/types'
import { FC } from 'react'

interface AccountIconProps {
  address?: string | Uint8Array | null | undefined
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
    <Identicon
      isAlternative={isAlternative}
      isHighlight={isHighlight}
      onCopy={onCopy}
      size={size}
      theme={theme}
      value={address}
    />
  )
}
