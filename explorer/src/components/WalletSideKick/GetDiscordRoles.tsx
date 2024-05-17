import { CheckMarkIcon } from '@/components/icons/CheckMarkIcon'
import { Accordion } from 'components/common/Accordion'
import { List, StyledListItem } from 'components/common/List'
import { Modal } from 'components/common/Modal'
import { EXTERNAL_ROUTES } from 'constants/routes'
import useWallet from 'hooks/useWallet'
import { signIn, useSession } from 'next-auth/react'
import Link from 'next/link'
import { FC, useCallback, useState } from 'react'
import toast from 'react-hot-toast'

interface StakingSummaryProps {
  subspaceAccount: string
}

interface StyledButtonProps {
  children: React.ReactNode
  className?: string
  onClick?: () => void
}

type ExplainerProps = {
  isOpen: boolean
  onClose: () => void
}

const StyledButton: FC<StyledButtonProps> = ({ children, className, onClick }) => (
  <button
    className={`w-[100px] rounded-xl border border-[#DE67E4] bg-transparent px-4 shadow-lg ${className}`}
    onClick={onClick}
  >
    {children}
  </button>
)

const Explainer: FC<ExplainerProps> = ({ isOpen, onClose }) => {
  return (
    <Modal title={'Explainer'} onClose={onClose} isOpen={isOpen}>
      <div className='flex flex-col items-start gap-4'>
        <div className='flex flex-col items-center gap-4'>
          <div className='grid grid-cols-1 gap-4'>
            <Accordion title='How to become a farmer?'>
              <Link href={EXTERNAL_ROUTES.docs + 'docs/category/farming/'} target='_blank'>
                Please refer to the farming documentation on the Subspace website.
              </Link>
            </Accordion>
            <Accordion title='Why am I not getting the verified farmer role?'>
              The address you are using to sign the message needs to have won a block or a vote
              while farming.
            </Accordion>
          </div>
        </div>
        <button
          className='flex w-full max-w-fit items-center gap-2 rounded-full bg-[#241235] px-2 text-sm font-medium text-white dark:bg-[#1E254E] md:space-x-4 md:text-base'
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </Modal>
  )
}

export const GetDiscordRoles: FC<StakingSummaryProps> = ({ subspaceAccount }) => {
  const { data: session } = useSession()
  const { actingAccount, injector } = useWallet()
  const [explainerOpen, setExplainerOpen] = useState(false)

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

  const handleConnectDiscord = useCallback(
    async () => await signIn('discord', { redirect: false }),
    [],
  )

  if (session?.user?.discord?.vcs.roles.farmer)
    return (
      <div className='m-2 mt-0 rounded-[20px] bg-[#DDEFF1] p-5 dark:bg-[#1E254E] dark:text-white'>
        <Accordion title='You are a Farmer on Discord'>
          <List>
            <StyledListItem title='You are a Farmer on Discord'>🌾</StyledListItem>
          </List>
        </Accordion>
      </div>
    )
  return (
    <div className='m-2 mt-0 rounded-[20px] bg-[#DDEFF1] p-5 dark:bg-[#1E254E] dark:text-white'>
      <Accordion title='Get verified roles on Discord'>
        <List>
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
          {!session?.user?.discord?.vcs.member && (
            <StyledListItem title='Join our Discord server'>
              <Link href={process.env.NEXT_PUBLIC_DISCORD_INVITE_URL ?? ''} target='_blank'>
                <StyledButton>Join</StyledButton>
              </Link>
            </StyledListItem>
          )}

          {session?.user?.subspace && (
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
          )}
        </List>
      </Accordion>
      <button
        className='text-xs text-gray-500 underline'
        onClick={() => setExplainerOpen(true)}
        style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}
      >
        Having trouble? Check the explainer.
      </button>
      <Explainer isOpen={explainerOpen} onClose={() => setExplainerOpen(false)} />
    </div>
  )
}
