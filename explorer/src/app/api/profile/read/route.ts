import { cryptoWaitReady, NetworkId, shortString, signatureVerify } from '@autonomys/auto-utils'
import { NextRequest, NextResponse } from 'next/server'
import { queryGraphqlServer } from 'utils/queryGraphqlServer'

type ProfileResponse = {
  users_wallets: Array<{
    address: string
    profile: {
      id: string
      name: string
      description: string
      avatar: string
      banner: string
      website: string
      email: string
      discord: string
      github: string
      twitter: string
      apiTotalRequests: number
      apiDailyRequestsLimit: number
      apiMonthlyRequestsLimit: number
      proofMessage: string
      proofSignature: string
      wallets: Array<{
        id: string
        address: string
        type: string
        createdAt: string
        updatedAt: string
        deletedAt: string | null
      }>
      apiKeys: Array<{
        id: string
        key: string
        description: string
        totalRequests: number
        createdAt: string
        updatedAt: string
        deletedAt: string | null
      }>
    }
  }>
}

export const POST = async (req: NextRequest) => {
  try {
    const NETWORK = process.env.USERS_INDEXER_NETWORK || NetworkId.LOCALHOST
    const body = await req.json()
    const { account, message, signature } = body
    await cryptoWaitReady()
    // Verify the signature to ensure it is valid
    const { isValid } = signatureVerify(message, signature, account)
    if (!isValid) return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })

    const data = await queryGraphqlServer<ProfileResponse>(
      `
      query GetProfileByWalletAddress($account: String!) {
        users_wallets(where: { address: { _eq: $account}}) {
          address
          profile {
            id
            name
            description
            avatar: avatar_url
            banner: banner_url
            website
            email
            discord
            github
            twitter
            apiTotalRequests: api_total_requests
            apiDailyRequestsLimit: api_daily_requests_limit
            apiMonthlyRequestsLimit: api_monthly_requests_limit
            proofMessage: proof_message
            proofSignature: proof_signature

            wallets {
              id
              address
              type
              createdAt: created_at
              updatedAt: updated_at
              deletedAt: deleted_at
            }

            apiKeys: api_keys {
              id
              key
              description
              totalRequests: total_requests
              createdAt: created_at
              updatedAt: updated_at
              deletedAt: deleted_at
            }
          }
        }
      }`,
      {
        account,
      },
      NETWORK,
    )

    if (data.users_wallets.length === 0)
      return NextResponse.json({
        message: 'Profile not found',
      })
    const userProfile = data.users_wallets[0].profile

    const userApiKeys = userProfile.apiKeys
      .map((apiKey) => ({
        ...apiKey,
        shortKey: shortString(apiKey.key, 4),
      }))
      .filter((apiKey) => apiKey.deletedAt === null)

    const userWallets = userProfile.wallets.filter((wallet) => wallet.deletedAt === null)

    return NextResponse.json({
      message: 'Profile loaded successfully',
      profile: userProfile,
      apiKeys: userApiKeys,
      wallets: userWallets,
    })
  } catch (error) {
    console.error('Error reading profile:', error)
    return NextResponse.json({ error: 'Failed to read profile' }, { status: 500 })
  }
}
