import { NetworkId } from '@autonomys/auto-utils'
import { CheckRoleDocument } from 'gql/graphql'
import { queryGraphqlServer } from 'utils/queryGraphqlServer'

const verifySubspaceAccountRolesForNetwork = async (
  subspaceAccount: string,
  network: NetworkId,
) => {
  try {
    if (!CheckRoleDocument.loc) throw new Error('No query')

    const data = await queryGraphqlServer(
      CheckRoleDocument.loc.source.body,
      {
        subspaceAccount,
      },
      network,
    )

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

export const verifySubspaceMainnetAccountRoles = async (subspaceAccount: string) =>
  verifySubspaceAccountRolesForNetwork(subspaceAccount, NetworkId.MAINNET)

export const verifySubspaceTaurusAccountRoles = async (subspaceAccount: string) =>
  verifySubspaceAccountRolesForNetwork(subspaceAccount, NetworkId.TAURUS)
