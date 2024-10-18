import { QUERY_CHECK_ROLES } from 'components/WalletSideKick/query'
import { queryGraphqlServer } from 'utils/queryGraphqlServer'

export const verifySubspaceAccountRoles = async (subspaceAccount: string) => {
  try {
    if (!QUERY_CHECK_ROLES.loc) throw new Error('No query')

    const data = await queryGraphqlServer(QUERY_CHECK_ROLES.loc.source.body, {
      subspaceAccount,
    })

    return {
      farmer: data.farmer.length > 0,
      operator: data.operator.totalCount > 0,
      nominator: data.nominator.totalCount > 0,
    }
  } catch (error) {
    console.error('Failed to fetch if user has any related events:', error)
    throw new Error('Failed to fetch if user has any related events')
  }
}
