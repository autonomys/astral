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
    const { subspaceAccount, name, value, profileId } = values
    await cryptoWaitReady()

    // Verify the signature to ensure it is valid
    const { isValid } = signatureVerify(message, signature, subspaceAccount)
    if (!isValid) return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })

    const data = await queryGraphqlServer<TagResponse>(
      `
      mutation InsertTags($profileId: uuid!, $value: String!, $name: String!) {
        insert_users_tags_one(
          object: {
            profile_id: $profileId
            value: $value
            name: $name
            type: "wallet"
            is_public: false
          }
          on_conflict: {
            constraint: tags_pkey,
            update_columns: [
              value,
              name,
              type,
              is_public
            ]
          }
        ) {
          id
          profile_id
          value
          name
          type
          is_public
        }
      }`,
      {
        profileId,
        value,
        name,
      },
      NETWORK,
    )

    return NextResponse.json({
      message: 'Tag saved successfully',
      tag: data.insert_users_tags_one,
    })
  } catch (error) {
    console.error('Error saving tags:', error)
    return NextResponse.json({ error: 'Failed to save tags' }, { status: 500 })
  }
}
