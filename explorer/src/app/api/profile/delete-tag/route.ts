import { cryptoWaitReady, NetworkId, signatureVerify } from '@autonomys/auto-utils'
import { NextRequest, NextResponse } from 'next/server'
import { queryGraphqlServer } from 'utils/queryGraphqlServer'

export const POST = async (req: NextRequest) => {
  try {
    const NETWORK = process.env.USERS_INDEXER_NETWORK || NetworkId.LOCALHOST
    const body = await req.json()
    const { values, message, signature } = body
    const { subspaceAccount, tagId } = values
    await cryptoWaitReady()

    // Verify the signature to ensure it is valid
    const { isValid } = signatureVerify(message, signature, subspaceAccount)
    if (!isValid) return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })

    await queryGraphqlServer(
      `
      mutation EditTag($tagId: uuid!) {
        update_users_tags_by_pk(
          pk_columns: {
            id: $tagId
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
        tagId,
      },
      NETWORK,
    )

    return NextResponse.json({
      message: 'Tag deleted successfully',
    })
  } catch (error) {
    console.error('Error deleting tag:', error)
    return NextResponse.json({ error: 'Failed to delete tag' }, { status: 500 })
  }
}
