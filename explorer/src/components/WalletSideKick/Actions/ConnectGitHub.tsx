import { StyledListItem } from 'components/common/List'
import { StyledButton } from 'components/common/StyledButton'
import { CheckMarkIcon } from 'components/icons/CheckMarkIcon'
import { signIn, useSession } from 'next-auth/react'
import { FC, useCallback } from 'react'

export const ConnectGitHub: FC = () => {
  const { data: session } = useSession()

  const handleConnectGitHub = useCallback(
    async () => await signIn('github', { redirect: false }),
    [],
  )

  if (!session || !session.user) return null

  return (
    <StyledListItem title='Connect your GitHub account!'>
      {session?.user?.github?.vcs ? (
        <>
          <CheckMarkIcon />
          <StyledButton className='ml-2' onClick={handleConnectGitHub}>
            Refresh
          </StyledButton>
        </>
      ) : (
        <StyledButton onClick={handleConnectGitHub}>Connect</StyledButton>
      )}
    </StyledListItem>
  )
}
