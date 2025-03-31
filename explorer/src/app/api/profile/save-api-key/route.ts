import { cryptoWaitReady, NetworkId, signatureVerify } from '@autonomys/auto-utils'
import { NextRequest, NextResponse } from 'next/server'
import { queryGraphqlServer } from 'utils/queryGraphqlServer'

type ApiKeyResponse = {
  insert_users_api_keys_one: {
    id: string
    profile_id: string
    key: string
    description: string
    total_requests: number
  }
}

export const POST = async (req: NextRequest) => {
  try {
    const NETWORK = process.env.USERS_INDEXER_NETWORK || NetworkId.LOCALHOST
    const body = await req.json()
    const { values, message, signature } = body
    const { subspaceAccount, description, profileId } = values
    await cryptoWaitReady()

    // Verify the signature to ensure it is valid
    const { isValid } = signatureVerify(message, signature, subspaceAccount)
    if (!isValid) return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })

    const data = await queryGraphqlServer<ApiKeyResponse>(
      `
      mutation SaveApiKey($profileId: uuid!, $description: String!) {
        insert_users_api_keys_one(
          object: {
            profile_id: $profileId
            description: $description
            total_requests: 0
          }
          on_conflict: {
            constraint: api_keys_pkey,
            update_columns: [
              description
            ]
          }
        ) {
          id
          profile_id
          key
          description
          total_requests
        }
      }`,
      {
        profileId,
        description,
      },
      NETWORK,
    )
    const key = data.insert_users_api_keys_one.key

    return NextResponse.json({
      message: 'API key created successfully',
      key,
      description,
    })
  } catch (error) {
    console.error('Error creating API key:', error)
    return NextResponse.json({ error: 'Failed to create API key' }, { status: 500 })
  }
}
