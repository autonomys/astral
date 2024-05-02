import { CheckMarkIcon } from '@/components/icons/CheckMarkIcon'
import { Accordion } from 'components/common/Accordion'
import { List, StyledListItem } from 'components/common/List'
import useWallet from 'hooks/useWallet'
import { signIn, useSession } from 'next-auth/react'
import Link from 'next/link'
import { FC, useCallback, useMemo } from 'react'
import toast from 'react-hot-toast'

interface StakingSummaryProps {
  subspaceAccount: string
}

interface StyledButtonProps {
  children: React.ReactNode
  className?: string
  onClick?: () => void
}

const StyledButton: FC<StyledButtonProps> = ({ children, className, onClick }) => (
  <button
    className={`w-[100px] rounded-xl border border-[#DE67E4] bg-transparent px-4 shadow-lg ${className}`}
    onClick={onClick}
  >
    {children}
  </button>
)

export const SubspaceWalletFlow: FC<StakingSummaryProps> = ({ subspaceAccount }) => {
  const { data: session } = useSession()
  const { actingAccount, injector } = useWallet()

  const handleWalletOwnership = useCallback(async () => {
    try {
      if (!actingAccount || !injector) throw new Error('No wallet connected')
      if (!injector.signer.signRaw) throw new Error('No signer')

      // Prepare and sign the message
      const message = `I am the owner of ${subspaceAccount}`
      const signature = await injector.signer.signRaw({
        address: actingAccount.address,
        type: 'bytes',
        data: message,
      })
      if (!signature) throw new Error('No signature')

      // Sign-in using the message&signature
      await signIn('subspace', {
        account: subspaceAccount,
        message,
        signature: signature.signature,
        redirect: false,
      })
      toast.success('You verified the ownership of your wallet!', { position: 'bottom-center' })
    } catch (error) {
      const reason = 'There was an error while signing the message'
      toast.error(reason, { position: 'bottom-center' })
      console.error('Error', error)
    }
  }, [actingAccount, injector, subspaceAccount])

  return (
    <StyledListItem title='Verify the ownership of your wallet'>
      {session?.user?.subspace?.signature ? (
        <>
          <CheckMarkIcon />
          <StyledButton className='ml-2' onClick={handleWalletOwnership}>
            Refresh
          </StyledButton>
        </>
      ) : (
        <StyledButton onClick={handleWalletOwnership}>Sign</StyledButton>
      )}
    </StyledListItem>
  )
}

export const DiscordFlow: FC = () => {
  const { data: session } = useSession()

  const handleConnectDiscord = useCallback(
    async () => await signIn('discord', { redirect: false }),
    [],
  )

  return (
    session?.user?.subspace && (
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
  )
}

export const GetDiscordRoles: FC<StakingSummaryProps> = ({ subspaceAccount }) => {
  const { data: session } = useSession()

  const hasAnyRoles = useMemo(
    () =>
      session?.user?.discord?.vcs &&
      Object.values(session.user.discord.vcs).some((role) => role === true),
    [session],
  )

  return (
    <div className='m-2 mt-0 rounded-[20px] bg-[#DDEFF1] p-5 dark:bg-[#1E254E] dark:text-white'>
      {hasAnyRoles ? (
        <>
          <Accordion title='Your roles on Discord'>
            <List>
              {session?.user?.discord?.vcs.roles.farmer && (
                <StyledListItem title='You are a Farmer on Discord'>🌾</StyledListItem>
              )}
              {session?.user?.discord?.vcs.roles.operator && (
                <StyledListItem title='You are a Nominator on Discord'>🌐</StyledListItem>
              )}
              {session?.user?.discord?.vcs.roles.nominator && (
                <StyledListItem title='You are a Operator on Discord'>🤝</StyledListItem>
              )}
              <SubspaceWalletFlow subspaceAccount={subspaceAccount} />
              <DiscordFlow />
            </List>
          </Accordion>
        </>
      ) : (
        <>
          <Accordion title='Get all your roles on Discord'>
            <List>
              <SubspaceWalletFlow subspaceAccount={subspaceAccount} />
              {!session?.user?.discord?.vcs.member && (
                <StyledListItem title='Join our Discord server'>
                  <Link href={process.env.NEXT_PUBLIC_DISCORD_INVITE_URL ?? ''} target='_blank'>
                    <StyledButton>Join</StyledButton>
                  </Link>
                </StyledListItem>
              )}
              <DiscordFlow />
            </List>
          </Accordion>
        </>
      )}
    </div>
  )
}
