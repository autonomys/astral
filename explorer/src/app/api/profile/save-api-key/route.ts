import { NetworkId } from 'constants/network'
import { NextRequest, NextResponse } from 'next/server'
import { verifySignature } from 'utils/crypto'
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

export async function POST(request: NextRequest) {
  try {
    const { message, signature, address, description, profileId } = await request.json()

    // Verify signature
    const isValid = await verifySignature(message, signature, address)
    if (!isValid) {
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
    }

    const NETWORK = process.env.USERS_INDEXER_NETWORK || NetworkId.MAINNET

    const data = await queryGraphqlServer<ApiKeyResponse>(
      `
        mutation InsertApiKey($profileId: uuid!, $description: String!) {
          insert_users_api_keys_one(object: { profile_id: $profileId, description: $description }) {
            id
            profile_id
            key
            description
            total_requests
          }
        }
      `,
      {
        profileId,
        description,
      },
      NETWORK,
    )

    return NextResponse.json(data)
  } catch (error) {
    console.error('Error saving API key:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 },
    )
  }
}
