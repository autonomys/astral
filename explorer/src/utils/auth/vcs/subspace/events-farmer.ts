import { QUERY_CHECK_ROLE } from 'components/WalletSideKick/query'
import { queryGraphqlServer } from 'utils/queryGraphqlServer'

export const verifySubspaceFarmer = async (subspaceAccount: string) => {
  try {
    if (!QUERY_CHECK_ROLE.loc) throw new Error('No query')
    if (!subspaceAccount) throw new Error('No subspaceAccount')

    const data = await queryGraphqlServer(QUERY_CHECK_ROLE.loc.source.body, { subspaceAccount })

    return data && data.isFarmer && data.isFarmer.length > 0
  } catch (error) {
    console.error('Failed to fetch if user has any farmers related events:', error)
    throw new Error('Failed to fetch if user has any farmers related events')
  }
}
