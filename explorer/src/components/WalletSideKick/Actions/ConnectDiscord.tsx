import { StyledListItem } from 'components/common/List'
import { StyledButton } from 'components/common/StyledButton'
import { CheckMarkIcon } from 'components/icons/CheckMarkIcon'
import { signIn, useSession } from 'next-auth/react'
import { FC, useCallback } from 'react'

export const ConnectDiscord: FC = () => {
  const { data: session } = useSession()

  const handleConnectDiscord = useCallback(
    async () => await signIn('discord', { redirect: false }),
    [],
  )

  if (!session || !session.user) return null

  return (
    <StyledListItem title='Connect your Discord account!'>
      {session?.user?.discord?.vcs.member ? (
        <>
          <CheckMarkIcon />
          <StyledButton className='ml-2' onClick={handleConnectDiscord}>
            Refresh
          </StyledButton>
        </>
      ) : (
        <StyledButton onClick={handleConnectDiscord}>Connect</StyledButton>
      )}
    </StyledListItem>
  )
}
