import { useQuery } from '@apollo/client'
import { CheckCircleIcon, ClockIcon } from '@heroicons/react/24/outline'
import { Accordion } from 'components/common/Accordion'
import { List, StyledListItem } from 'components/common/List'
import { Modal } from 'components/common/Modal'
import { CheckMarkIcon } from 'components/icons/CheckMarkIcon'
import { EXTERNAL_ROUTES, ROUTE_API } from 'constants/routes'
import { ExtrinsicsByHashQuery } from 'gql/graphql'
import useDomains from 'hooks/useDomains'
import useWallet from 'hooks/useWallet'
import { signIn, useSession } from 'next-auth/react'
import Link from 'next/link'
import { FC, useCallback, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { QUERY_EXTRINSIC_BY_HASH } from '../Extrinsic/query'

interface StakingSummaryProps {
  subspaceAccount: string
}

interface StyledButtonProps {
  children: React.ReactNode
  className?: string
  isDisabled?: boolean
  onClick?: () => void
}

type ExplainerProps = {
  isOpen: boolean
  onClose: () => void
}

const StyledButton: FC<StyledButtonProps> = ({ children, className, isDisabled, onClick }) => (
  <button
    className={`w-[100px] rounded-xl border border-purpleAccent bg-transparent px-4 shadow-lg ${className}`}
    disabled={isDisabled}
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
          className='flex w-full max-w-fit items-center gap-2 rounded-full bg-grayDarker px-2 text-sm font-medium text-white dark:bg-blueAccent md:space-x-4 md:text-base'
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </Modal>
  )
}

const ExplainerLinkAndModal: FC = () => {
  const [explainerOpen, setExplainerOpen] = useState(false)
  return (
    <>
      <button
        className='text-xs text-gray-500 underline'
        onClick={() => setExplainerOpen(true)}
        style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}
      >
        Having trouble? Check the explainer.
      </button>
      <Explainer isOpen={explainerOpen} onClose={() => setExplainerOpen(false)} />
    </>
  )
}

export const GetDiscordRoles: FC<StakingSummaryProps> = ({ subspaceAccount }) => {
  const { data: session } = useSession()
  const { selectedChain } = useDomains()
  const { actingAccount, injector } = useWallet()
  const [claimIsPending, setClaimIsPending] = useState(false)
  const [claimIsFinalized, setClaimIsFinalized] = useState(false)
  const [claimError, setClaimError] = useState<string | null>(null)
  const [claimHash, setClaimHash] = useState<string | null>(null)

  const { data } = useQuery<ExtrinsicsByHashQuery>(QUERY_EXTRINSIC_BY_HASH, {
    variables: { hash: claimHash },
    skip: claimHash === null || claimIsFinalized,
    pollInterval: 6000,
  })

  const handleWalletOwnership = useCallback(async () => {
    try {
      if (!actingAccount || !injector) throw new Error('No wallet connected')
      if (!injector.signer.signRaw) throw new Error('No signer')
      if (!subspaceAccount) throw new Error('No subspace account')

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

  const handleClaimOperatorDisbursement = useCallback(async () => {
    setClaimError(null)
    if (!actingAccount || !injector) throw new Error('No wallet connected')
    if (!injector.signer.signRaw) throw new Error('No signer')
    if (!subspaceAccount) throw new Error('No subspace account')

    // Prepare and sign the message
    const message = `I am the owner of ${subspaceAccount} and I claim the operator disbursement`
    const signature = await injector.signer.signRaw({
      address: actingAccount.address,
      type: 'bytes',
      data: message,
    })
    if (!signature) throw new Error('No signature')
    const claim = await fetch(ROUTE_API.claim.operatorDisbursement(selectedChain.urls.page), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        address: actingAccount.address,
        message,
        signature: signature.signature,
      }),
    }).then((res) => res.json())
    if (claim.hash) {
      setClaimIsPending(true)
      setClaimHash(claim.hash)
    } else if (claim.error) setClaimError(claim.error)
  }, [actingAccount, injector, selectedChain.urls.page, subspaceAccount])

  useEffect(() => {
    if (data && data.extrinsics && data.extrinsics.length > 0) setClaimIsFinalized(true)
  }, [data])

  if (session?.user?.discord?.vcs.roles.farmer)
    return (
      <div className='m-2 mt-0 rounded-[20px] bg-grayLight p-5 dark:bg-blueAccent dark:text-white'>
        <Accordion title='Your verified roles on Discord'>
          <List>
            <StyledListItem title='You are a Verified Farmer on Discord'>🌾</StyledListItem>
          </List>
          <List>
            <StyledListItem
              title={
                <>
                  <p>
                    <b>Run an operator node</b> in Stake Wars 2,
                  </p>
                  <p>
                    {' '}
                    claim <b>100 {selectedChain.token.symbol}</b> to cover the operator stake.
                  </p>
                </>
              }
            >
              {claimIsFinalized ? (
                <>
                  <p className='text-sm text-gray-500'>
                    Claimed <CheckCircleIcon className='size-5' stroke='green' />
                  </p>
                </>
              ) : (
                <>
                  {claimIsPending ? (
                    <p className='text-sm text-gray-500'>
                      Pending <ClockIcon className='size-5' stroke='orange' />
                    </p>
                  ) : (
                    <StyledButton
                      className={`ml-2 ${claimError !== null && 'cursor-not-allowed'}`}
                      isDisabled={claimError !== null}
                      onClick={handleClaimOperatorDisbursement}
                    >
                      Claim
                    </StyledButton>
                  )}
                </>
              )}
            </StyledListItem>
            {claimError && <p className='text-sm text-red-500'>{claimError}</p>}
          </List>
        </Accordion>
        <ExplainerLinkAndModal />
      </div>
    )

  return (
    <div className='m-2 mt-0 rounded-[20px] bg-grayLight p-5 dark:bg-blueAccent dark:text-white'>
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
      <ExplainerLinkAndModal />
    </div>
  )
}
