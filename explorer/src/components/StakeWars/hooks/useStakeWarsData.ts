import { useQuery } from '@apollo/client'
import { GetCurrentBlockNumberQuery } from 'gql/rewardTypes'
import { useWindowFocus } from 'hooks/useWindowFocus'
import { useErrorHandler } from 'react-error-boundary'
import { GET_CURRENT_BLOCK_NUMBER } from '../rewardsQuery'

export const useStakeWarsData = () => {
  const inFocus = useWindowFocus()
  const { data, loading, error } = useQuery<GetCurrentBlockNumberQuery>(GET_CURRENT_BLOCK_NUMBER, {
    skip: !inFocus,
    context: { clientName: 'rewards' },
  })
  useErrorHandler(error)
  return { data, loading, error }
}
