import { StyledListItem } from 'components/common/List'
import { StyledButton } from 'components/common/StyledButton'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { FC } from 'react'

export const JoinDiscord: FC = () => {
  const { data: session } = useSession()

  return (
    !session?.user?.discord?.vcs.member && (
      <StyledListItem title='Join our Discord server'>
        <Link href={process.env.NEXT_PUBLIC_DISCORD_INVITE_URL ?? ''} target='_blank'>
          <StyledButton>Join</StyledButton>
        </Link>
      </StyledListItem>
    )
  )
}
