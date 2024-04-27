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

export const ConnectDiscord: FC<StakingSummaryProps> = ({ subspaceAccount }) => {
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
    if (!actingAccount || !injector) throw new Error('No wallet connected')
    try {
      const message = `I am the owner of ${subspaceAccount}`
      const signature =
        injector.signer.signRaw &&
        (await injector.signer.signRaw({
          address: actingAccount.address,
          type: 'bytes',
          data: message,
        }))

      if (!signature) throw new Error('No signature')

      await signIn('subspace', {
        account: subspaceAccount,
        message,
        signature: signature.signature,
        redirect: false,
      })

      toast.success('The message was signed', { position: 'bottom-center' })
    } catch (error) {
      const reason = 'There was an error while signing the message'
      toast.error(reason, { position: 'bottom-center' })
      console.error('Error', error)
    }
  }, [actingAccount, injector, subspaceAccount])

  const handleConnectDiscord = useCallback(async () => await signIn('discord'), [])

  const handleSignAndSendProof = useCallback(async () => {
    console.log('Sign And Send Proof')
    await fetch('/api/grant-farmer-role')
  }, [])

  const isFarmer = useMemo(() => data && data.isFarmer && data.isFarmer.length > 0, [data])

  if (
    session &&
    session.user &&
    session.user.discord &&
    session.user.discord.isDiscordFarmerRole &&
    session.user.discord.isDiscordFarmerRole
  )
    return (
      <div className='m-2 mt-0 rounded-[20px] bg-[#DDEFF1] p-5 dark:bg-[#1E254E] dark:text-white'>
        <Accordion title='You are a Farmer on Discord'>
          <List>
            <StyledListItem title='You are a Farmer on Discord'>🌾</StyledListItem>
          </List>
        </Accordion>
      </div>
    )

  if (isFarmer)
    return (
      <div className='m-2 mt-0 rounded-[20px] bg-[#DDEFF1] p-5 dark:bg-[#1E254E] dark:text-white'>
        <Accordion title='Get your Farmer role on Discord'>
          <List>
            <StyledListItem title='1. Verify the ownership of your wallet'>
              <button
                className='w-[100px] rounded-xl border border-[#DE67E4] bg-transparent px-4 shadow-lg'
                onClick={handleWalletOwnership}
              >
                Sign
              </button>
            </StyledListItem>
            {session &&
            session.user &&
            session.user.discord &&
            !session.user.discord.isDiscordGuildMember ? (
              <>
                <StyledListItem title='2. Join our Discord server'>
                  <Link href={process.env.NEXT_PUBLIC_DISCORD_INVITE_URL ?? ''} target='_blank'>
                    <button className='w-[100px] rounded-xl border border-[#DE67E4] bg-transparent px-4 shadow-lg'>
                      Join
                    </button>
                  </Link>
                </StyledListItem>

                <StyledListItem title='3. Connect your Discord again!'>
                  <button
                    className='w-[100px] rounded-xl border border-[#DE67E4] bg-transparent px-4 shadow-lg'
                    onClick={handleConnectDiscord}
                  >
                    Connect
                  </button>
                </StyledListItem>
              </>
            ) : (
              <StyledListItem title='2. Connect your Discord'>
                <button
                  className='w-[100px] rounded-xl border border-[#DE67E4] bg-transparent px-4 shadow-lg'
                  onClick={handleConnectDiscord}
                >
                  Connect
                </button>
              </StyledListItem>
            )}
            <StyledListItem
              title={`${session && session.user && session.user.discord && !session.user.discord.isDiscordGuildMember ? 3 : 2}. Sign a message as proof to request role`}
            >
              <button
                className={
                  'w-[100px] rounded-xl border border-[#DE67E4] bg-transparent px-4 shadow-lg'
                }
                onClick={handleSignAndSendProof}
              >
                Get Role
              </button>
            </StyledListItem>
          </List>
        </Accordion>
      </div>
    )

  return <></>
}
