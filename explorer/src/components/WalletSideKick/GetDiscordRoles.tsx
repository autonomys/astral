import { CheckMarkIcon } from '@/components/icons/CheckMarkIcon'
import { useQuery } from '@apollo/client'
import { Accordion } from 'components/common/Accordion'
import { List, StyledListItem } from 'components/common/List'
import { CheckRoleQuery } from 'gql/graphql'
import useWallet from 'hooks/useWallet'
import { signIn, useSession } from 'next-auth/react'
import Link from 'next/link'
import { FC, useCallback, useMemo } from 'react'
import toast from 'react-hot-toast'
import { QUERY_CHECK_ROLE } from './query'

interface StakingSummaryProps {
  subspaceAccount: string
}

export const GetDiscordRoles: FC<StakingSummaryProps> = ({ subspaceAccount }) => {
  const { data: session } = useSession()
  const { actingAccount, injector } = useWallet()

  const summaryVariables = useMemo(
    () => ({
      first: 10,
      subspaceAccount,
    }),
    [subspaceAccount],
  )
  const { data } = useQuery<CheckRoleQuery>(QUERY_CHECK_ROLE, {
    variables: summaryVariables,
    pollInterval: 6000,
  })

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

  const isFarmer = useMemo(() => data && data.isFarmer && data.isFarmer.length > 0, [data])

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

  if (isFarmer && !session?.user?.discord?.vcs.roles.farmer)
    return (
      <div className='m-2 mt-0 rounded-[20px] bg-[#DDEFF1] p-5 dark:bg-[#1E254E] dark:text-white'>
        <Accordion title='Get your Farmer role on Discord'>
          <List>
            <StyledListItem title='Verify the ownership of your wallet'>
              {session?.user?.subspace?.signature ? (
                <>
                  <CheckMarkIcon />
                  <button
                    className='ml-2 w-[100px] rounded-xl border border-[#DE67E4] bg-transparent px-4 shadow-lg'
                    onClick={handleWalletOwnership}
                  >
                    Refresh
                  </button>
                </>
              ) : (
                <button
                  className='w-[100px] rounded-xl border border-[#DE67E4] bg-transparent px-4 shadow-lg'
                  onClick={handleWalletOwnership}
                >
                  Sign
                </button>
              )}
            </StyledListItem>
            {!session?.user?.discord?.vcs.member && (
              <StyledListItem title='Join our Discord server'>
                <Link href={process.env.NEXT_PUBLIC_DISCORD_INVITE_URL ?? ''} target='_blank'>
                  <button className='w-[100px] rounded-xl border border-[#DE67E4] bg-transparent px-4 shadow-lg'>
                    Join
                  </button>
                </Link>
              </StyledListItem>
            )}

            {session?.user?.subspace && (
              <StyledListItem title='Connect your Discord account!'>
                {session?.user?.discord?.vcs.member ? (
                  <>
                    <CheckMarkIcon />
                    <button
                      className='ml-2 w-[100px] rounded-xl border border-[#DE67E4] bg-transparent px-4 shadow-lg'
                      onClick={handleConnectDiscord}
                    >
                      Refresh
                    </button>
                  </>
                ) : (
                  <button
                    className='w-[100px] rounded-xl border border-[#DE67E4] bg-transparent px-4 shadow-lg'
                    onClick={handleConnectDiscord}
                  >
                    Connect
                  </button>
                )}
              </StyledListItem>
            )}
          </List>
        </Accordion>
      </div>
    )

  return <></>
}
