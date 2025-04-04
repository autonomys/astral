import { cryptoWaitReady, NetworkId, signatureVerify } from '@autonomys/auto-utils'
import { NextRequest, NextResponse } from 'next/server'
import { queryGraphqlServer } from 'utils/queryGraphqlServer'

export const POST = async (req: NextRequest) => {
  try {
    const NETWORK = process.env.USERS_INDEXER_NETWORK || NetworkId.LOCALHOST
    const body = await req.json()
    const { values, message, signature } = body
    const { subspaceAccount, apiKeyId } = values
    await cryptoWaitReady()

    // Verify the signature to ensure it is valid
    const { isValid } = signatureVerify(message, signature, subspaceAccount)
    if (!isValid) return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })

    await queryGraphqlServer(
      `
      mutation EditApiKey($apiKeyId: uuid!) {
        update_users_api_keys_by_pk(
          pk_columns: {
            id: $apiKeyId
          },
          _set: {
            deleted_at: "now()"
          }
        ) {
          id
          deleted_at
        }
      }`,
      {
        apiKeyId,
      },
      NETWORK,
    )

    return NextResponse.json({
      message: 'API key deleted successfully',
    })
  } catch (error) {
    console.error('Error deleting API key:', error)
    return NextResponse.json({ error: 'Failed to delete API key' }, { status: 500 })
  }
}
