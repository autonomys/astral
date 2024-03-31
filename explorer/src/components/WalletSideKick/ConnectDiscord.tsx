import { useQuery } from '@apollo/client'
import { Accordion } from 'components/common/Accordion'
import { List, StyledListItem } from 'components/common/List'
import { CheckRoleQuery } from 'gql/graphql'
import { signIn, useSession } from 'next-auth/react'
import Link from 'next/link'
import { FC, useCallback, useMemo } from 'react'
import { QUERY_CHECK_ROLE } from './query'

interface StakingSummaryProps {
  subspaceAccount: string
}

export const ConnectDiscord: FC<StakingSummaryProps> = ({ subspaceAccount }) => {
  const { data: session } = useSession()

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

  const handleConnectDiscord = useCallback(async () => await signIn('discord'), [])

  const handleSignAndSendProof = useCallback(() => {
    console.log('Sign And Send Proof')
  }, [])

  const isFarmer = useMemo(() => data && data.isFarmer && data.isFarmer.length > 0, [data])

  if (
    session &&
    session.user &&
    session.user.isDiscordFarmerRole &&
    session.user.isDiscordFarmerRole
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
            {session && session.user && !session.user.isDiscordGuildMember ? (
              <>
                <StyledListItem title='1. Join our Discord server'>
                  <Link href={process.env.NEXT_PUBLIC_DISCORD_INVITE_URL ?? ''} target='_blank'>
                    <button className='w-[100px] rounded-xl border border-[#DE67E4] bg-transparent px-4 shadow-lg'>
                      Join
                    </button>
                  </Link>
                </StyledListItem>

                <StyledListItem title='2. Connect your Discord again!'>
                  <button
                    className='w-[100px] rounded-xl border border-[#DE67E4] bg-transparent px-4 shadow-lg'
                    onClick={handleConnectDiscord}
                  >
                    Connect
                  </button>
                </StyledListItem>
              </>
            ) : (
              <StyledListItem title='1. Connect your Discord'>
                <button
                  className='w-[100px] rounded-xl border border-[#DE67E4] bg-transparent px-4 shadow-lg'
                  onClick={handleConnectDiscord}
                >
                  Connect
                </button>
              </StyledListItem>
            )}
            <StyledListItem
              title={`${session && session.user && !session.user.isDiscordGuildMember ? 3 : 2}. Sign a message as proof to request role`}
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
