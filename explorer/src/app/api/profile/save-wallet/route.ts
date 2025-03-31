import { cryptoWaitReady, NetworkId, signatureVerify } from '@autonomys/auto-utils'
import { NextRequest, NextResponse } from 'next/server'
import { queryGraphqlServer } from 'utils/queryGraphqlServer'

export const POST = async (req: NextRequest) => {
  try {
    const NETWORK = process.env.USERS_INDEXER_NETWORK || NetworkId.LOCALHOST
    const body = await req.json()
    const { values, message, signature } = body
    const { address, profileId, originalAccountId, originalMessage, originalSignature } = values
    await cryptoWaitReady()

    // Verify the signature to ensure it is valid
    const { isValid } = signatureVerify(message, signature, address)

    if (!isValid) return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })

    // Verify the original signature to ensure it is valid
    const { isValid: isOriginalSignatureValid } = signatureVerify(
      originalMessage,
      originalSignature,
      originalAccountId,
    )

    if (!isOriginalSignatureValid)
      return NextResponse.json({ error: 'Invalid original signature' }, { status: 400 })

    await queryGraphqlServer(
      `
      mutation SaveWallet($profileId: uuid!, $address: String!) {
        insert_users_wallets_one(
          object: {
            profile_id: $profileId
            address: $address
            type: "subspace"
          }
        ) {
          id
          profile_id
          address
          type
        }
      }`,
      {
        profileId,
        address,
      },
      NETWORK,
    )

    return NextResponse.json({
      message: 'Wallet linked successfully',
    })
  } catch (error) {
    console.error('Error linking wallet:', error)
    return NextResponse.json({ error: 'Failed to link wallet' }, { status: 500 })
  }
}
