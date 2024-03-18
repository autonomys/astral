import { useQuery } from '@apollo/client'
import { Accordion } from 'components/common/Accordion'
import { List, StyledListItem } from 'components/common/List'
import { CheckRoleQuery } from 'gql/graphql'
import { signIn } from 'next-auth/react'
import { FC, useCallback, useMemo } from 'react'
import { QUERY_CHECK_ROLE } from './query'

interface StakingSummaryProps {
  subspaceAccount: string
}

export const ConnectDiscord: FC<StakingSummaryProps> = ({ subspaceAccount }) => {
  const summaryVariables = useMemo(
    () => ({
      first: 10,
      subspaceAccount,
    }),
    [subspaceAccount],
  )
  const { data, error, loading } = useQuery<CheckRoleQuery>(QUERY_CHECK_ROLE, {
    variables: summaryVariables,
    pollInterval: 6000,
  })

  const handleConnectDiscord = useCallback(() => {
    console.log('Connect Discord')
    signIn('discord')
  }, [])

  const handleSignAndSendProof = useCallback(() => {
    console.log('Sign And Send Proof')
  }, [])

  const isFarmer = useMemo(() => data && data.isFarmer && data.isFarmer.length > 0, [data])

  if (isFarmer)
    return (
      <div className='m-2 mt-0 rounded-[20px] bg-[#DDEFF1] p-5 dark:bg-[#1E254E] dark:text-white'>
        <Accordion title='Get your Farmer role on Discord'>
          <List>
            <StyledListItem title='1. Connect your Discord'>
              <button
                className='w-[100px] rounded-xl border border-[#DE67E4] bg-transparent px-4 shadow-lg'
                onClick={handleConnectDiscord}
              >
                Connect
              </button>
            </StyledListItem>
            <StyledListItem title='2. Sign a message as proof to request role'>
              <button
                className='w-[100px] rounded-xl border border-[#DE67E4] bg-transparent px-4 shadow-lg'
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
