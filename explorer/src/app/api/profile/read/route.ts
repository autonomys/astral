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
      emailIsPublic: boolean
      discordIsPublic: boolean
      githubIsPublic: boolean
      twitterIsPublic: boolean
      websiteIsPublic: boolean
      walletsArePublic: boolean
      tagsArePublic: boolean
      wallets: Array<{
        id: string
        address: string
        type: string
        isPublic: boolean
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
      tags: Array<{
        id: string
        name: string
        type: string
        value: string
        isPublic: boolean
        createdAt: string
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
            nameIsPublic: name_is_public
            bio
            bioIsPublic: bio_is_public
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
            emailIsPublic: email_is_public
            discordIsPublic: discord_is_public
            githubIsPublic: github_is_public
            twitterIsPublic: twitter_is_public
            websiteIsPublic: website_is_public
            wallets {
              id
              address
              type
              isPublic: is_public
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
            tags {
              id
              name
              type
              value
              isPublic: is_public
              createdAt: created_at
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

    if (!data || !data.users_wallets || data.users_wallets.length === 0)
      return NextResponse.json({
        message: 'Profile not found',
        success: false,
      })
    const userProfile = data.users_wallets[0].profile

    const userApiKeys = userProfile.apiKeys
      ? userProfile.apiKeys
          .map((apiKey) => ({
            ...apiKey,
            shortKey: shortString(apiKey.key, 4),
          }))
          .filter((apiKey) => apiKey.deletedAt === null)
      : []

    const userWallets = userProfile.wallets.filter((wallet) => wallet.deletedAt === null)
    const userTags = userProfile.tags
      ? userProfile.tags.filter((tag) => tag.deletedAt === null)
      : []

    return NextResponse.json({
      message: 'Profile loaded successfully',
      success: true,
      profile: userProfile,
      apiKeys: userApiKeys,
      wallets: userWallets,
      tags: userTags,
    })
  } catch (error) {
    console.error('Error reading profile:', error)
    return NextResponse.json({ error: 'Failed to read profile' }, { status: 500 })
  }
}
