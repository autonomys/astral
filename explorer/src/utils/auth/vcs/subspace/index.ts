import { NetworkId } from '@autonomys/auto-utils'
import { CheckRoleDocument, CheckRoleQuery } from 'gql/graphql'
import { queryGraphqlServer } from 'utils/queryGraphqlServer'

const verifySubspaceAccountRolesForNetwork = async (
  subspaceAccount: string,
  network: NetworkId,
) => {
  try {
    if (!CheckRoleDocument.loc) throw new Error('No query')

    const data = await queryGraphqlServer<CheckRoleQuery>(
      CheckRoleDocument.loc.source.body,
      {
        subspaceAccount,
      },
      network,
    )

    return {
      farmer: data.isFarmer.length > 0,
      operator: data.isOperator.length > 0,
      nominator: data.isNominator.length > 0,
      talismanFarmer: data.isTalismanFarmer.length > 0,
    }
  } catch (error) {
    console.error('Failed to fetch if user has any related events:', error)
    return {
      farmer: false,
      operator: false,
      nominator: false,
      talismanFarmer: false,
    }
  }
}

export const verifySubspaceMainnetAccountRoles = async (subspaceAccount: string) =>
  verifySubspaceAccountRolesForNetwork(subspaceAccount, NetworkId.MAINNET)

export const verifySubspaceTaurusAccountRoles = async (subspaceAccount: string) =>
  verifySubspaceAccountRolesForNetwork(subspaceAccount, NetworkId.TAURUS)
