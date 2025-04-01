import { NetworkId } from '@autonomys/auto-utils'
import { NextRequest, NextResponse } from 'next/server'
import { queryGraphqlServer } from 'utils/queryGraphqlServer'

type PublicProfileResponse = {
  users_profiles: {
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
    wallets: Array<{
      id: string
      address: string
      type: string
      deletedAt: string | null
    }>
    website_is_public: boolean
    email_is_public: boolean
    discord_is_public: boolean
    github_is_public: boolean
    twitter_is_public: boolean
    wallets_are_public: boolean
  }
}

export const GET = async (req: NextRequest) => {
  try {
    const NETWORK = process.env.USERS_INDEXER_NETWORK || NetworkId.LOCALHOST

    // Get the profile ID from the URL search params
    const { searchParams } = new URL(req.url)
    const profileId = searchParams.get('id')

    if (!profileId) {
      return NextResponse.json({ error: 'Profile ID is required' }, { status: 400 })
    }

    const data = await queryGraphqlServer<PublicProfileResponse>(
      `
      query GetPublicProfile($profileId: uuid!) {
        users_profiles: users_profiles_by_pk(id: $profileId) {
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
          wallets {
            id
            address
            type
            deletedAt: deleted_at
          }
          website_is_public
          email_is_public
          discord_is_public
          github_is_public
          twitter_is_public
          wallets_are_public
        }
      }`,
      {
        profileId,
      },
      NETWORK,
    )

    if (!data.users_profiles) {
      return NextResponse.json(
        {
          message: 'Profile not found',
        },
        { status: 404 },
      )
    }

    // Filter out sensitive data and respect privacy settings
    const profile = data.users_profiles
    const publicProfile = {
      id: profile.id,
      name: profile.name,
      description: profile.description,
      avatar: profile.avatar,
      banner: profile.banner,
      website: profile.website_is_public ? profile.website : null,
      email: profile.email_is_public ? profile.email : null,
      discord: profile.discord_is_public ? profile.discord : null,
      github: profile.github_is_public ? profile.github : null,
      twitter: profile.twitter_is_public ? profile.twitter : null,
      wallets: profile.wallets_are_public
        ? profile.wallets
            .filter((wallet) => wallet.deletedAt === null)
            .map(({ id, address, type }) => ({ id, address, type }))
        : [],
    }

    return NextResponse.json({
      message: 'Profile loaded successfully',
      profile: publicProfile,
    })
  } catch (error) {
    console.error('Error reading public profile:', error)
    return NextResponse.json({ error: 'Failed to load profile' }, { status: 500 })
  }
}
