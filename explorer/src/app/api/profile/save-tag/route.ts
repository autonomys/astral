import { cryptoWaitReady, NetworkId, signatureVerify } from '@autonomys/auto-utils'
import { NextRequest, NextResponse } from 'next/server'
import { queryGraphqlServer } from 'utils/queryGraphqlServer'

type TagResponse = {
  insert_users_tags_one: {
    id: string
    profile_id: string
    tags: string[]
  }
}

export const POST = async (req: NextRequest) => {
  try {
    const NETWORK = process.env.USERS_INDEXER_NETWORK || NetworkId.LOCALHOST
    const body = await req.json()
    const { values, message, signature } = body
    const { subspaceAccount, tags, profileId } = values
    await cryptoWaitReady()

    // Verify the signature to ensure it is valid
    const { isValid } = signatureVerify(message, signature, subspaceAccount)
    if (!isValid) return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })

    const data = await queryGraphqlServer<TagResponse>(
      `
      mutation InsertTags($profileId: uuid!, $walletAddress: String!, $tags: [String!]) {
        insert_users_tags_one(
          object: {
            profile_id: $profileId
            wallet_address: $walletAddress
            tags: $tags
          }
          on_conflict: {
            constraint: tags_pkey,
            update_columns: [
              tags
            ]
          }
        ) {
          id
          profile_id
          tags
        }
      }`,
      {
        profileId,
        walletAddress: subspaceAccount,
        tags,
      },
      NETWORK,
    )

    return NextResponse.json({
      message: 'Tags saved successfully',
      tags: data.insert_users_tags_one.tags,
    })
  } catch (error) {
    console.error('Error saving tags:', error)
    return NextResponse.json({ error: 'Failed to save tags' }, { status: 500 })
  }
}
