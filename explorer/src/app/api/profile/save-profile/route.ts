import { cryptoWaitReady, NetworkId, signatureVerify } from '@autonomys/auto-utils'
import { NextRequest, NextResponse } from 'next/server'
import { queryGraphqlServer } from 'utils/queryGraphqlServer'
import { v5 as uuidv5 } from 'uuid'

type WalletResponse = {
  users_wallets: Array<{
    address: string
    profile: {
      id: string
    }
  }>
}

export const POST = async (req: NextRequest) => {
  try {
    const NETWORK = process.env.USERS_INDEXER_NETWORK || NetworkId.LOCALHOST
    const body = await req.json()
    const { subspaceAccount, values, message, signature } = body
    const {
      name,
      description,
      avatar,
      banner,
      website,
      email,
      discord,
      github,
      twitter,
      emailIsPublic,
      discordIsPublic,
      githubIsPublic,
      twitterIsPublic,
      websiteIsPublic,
      walletsArePublic,
      tagsArePublic,
    } = values
    await cryptoWaitReady()

    // Verify the signature to ensure it is valid
    const { isValid } = signatureVerify(message, signature, subspaceAccount)
    if (!isValid) return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
    let profileId = ''
    try {
      const dataWallet = await queryGraphqlServer<WalletResponse>(
        `
      query GetProfileByWalletAddress($subspaceAccount: String!) {
        users_wallets(where: { address: { _eq: $subspaceAccount } }) {
          address
          profile {
            id
          }
        }
      }`,
        {
          subspaceAccount,
        },
        NETWORK,
      )
      profileId = dataWallet.users_wallets[0].profile.id
    } catch (error) {
      // Generate deterministic UUID v5 from wallet address using URL namespace
      // Use a valid UUID namespace for URLs
      const UUID_NAMESPACE = '6ba7b810-9dad-11d1-80b4-00c04fd430c8'
      // Convert wallet address to string and generate UUID
      const uuid = uuidv5(subspaceAccount, UUID_NAMESPACE).toLowerCase()
      profileId = uuid
    }

    await queryGraphqlServer(
      `
        mutation SaveProfile($profileId: uuid!) {
          insert_users_profiles_one(
            object: {
              id: $profileId
              name: "${name}"
              description: "${description}"
              avatar_url: "${avatar}"
              banner_url: "${banner}"
              website: "${website}"
              website_is_verified: false
              website_is_public: ${websiteIsPublic}
              email: "${email}"
              email_is_verified: false
              email_is_public: ${emailIsPublic}
              discord: "${discord}"
              discord_is_verified: false
              discord_is_public: ${discordIsPublic}
              github: "${github}"
              github_is_verified: false
              github_is_public: ${githubIsPublic}
              twitter: "${twitter}"
              twitter_is_verified: false
              twitter_is_public: ${twitterIsPublic}
              api_total_requests: 0
              api_daily_requests_limit: 1000
              api_monthly_requests_limit: 10000
              proof_message: ""
              proof_signature: "${signature}"
              wallets_are_public: ${walletsArePublic}
              tags_are_public: ${tagsArePublic}
            }
            on_conflict: {
              constraint: profiles_pkey,
              update_columns: [
                name,
                description,
                avatar_url,
                banner_url,
                website,
                website_is_verified,
                website_is_public,
                email,
                email_is_verified,
                email_is_public,
                discord,
                discord_is_verified,
                discord_is_public,
                github,
                github_is_verified,
                github_is_public,
                twitter,
                twitter_is_verified,
                twitter_is_public,
                proof_message,
                proof_signature,
                wallets_are_public,
                tags_are_public,
                updated_at
              ]
            }
          ) {
            id
            name
            description
            avatar_url
            banner_url
            website
            website_is_verified
            website_is_public
            email
            email_is_verified
            email_is_public
            discord
            discord_is_verified
            discord_is_public
            github
            github_is_verified
            github_is_public
            twitter
            twitter_is_verified
            twitter_is_public
            api_total_requests
            api_daily_requests_limit
            api_monthly_requests_limit
            proof_message
            proof_signature
            wallets_are_public
            tags_are_public
          }
        }`,
      { profileId },
      NETWORK,
    )

    await queryGraphqlServer(
      `
        mutation SaveWallet($profileId: uuid!, $subspaceAccount: String!) {
          insert_users_wallets_one(
            object: {
              profile_id: $profileId
              address: $subspaceAccount
              type: "subspace"
            }
            on_conflict: {
              constraint: wallets_pkey,
              update_columns: [
                type
              ]
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
        subspaceAccount,
      },
      NETWORK,
    )

    return NextResponse.json({
      message: 'Profile saved successfully',
    })
  } catch (error) {
    console.error('Error saving profile:', error)
    return NextResponse.json({ error: 'Failed to save profile' }, { status: 500 })
  }
}
