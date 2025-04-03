import { NetworkId } from '@autonomys/auto-utils'
import { NextRequest, NextResponse } from 'next/server'
import { queryGraphqlServer } from 'utils/queryGraphqlServer'

type PublicProfileResponse = {
  users_profiles: {
    id: string
    name: string
    bio: string
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
      isPublic: boolean
      deletedAt: string | null
    }>
    tags: Array<{
      id: string
      name: string
      type: string
      value: string
      isPublic: boolean
      deletedAt: string | null
    }>
    nameIsPublic: boolean
    bioIsPublic: boolean
    websiteIsPublic: boolean
    emailIsPublic: boolean
    discordIsPublic: boolean
    githubIsPublic: boolean
    twitterIsPublic: boolean
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
          bio
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
            isPublic: is_public
            deletedAt: deleted_at
          }
          nameIsPublic: name_is_public
          bioIsPublic: bio_is_public
          websiteIsPublic: website_is_public
          emailIsPublic: email_is_public
          discordIsPublic: discord_is_public
          githubIsPublic: github_is_public
          twitterIsPublic: twitter_is_public
          tags {
            id
            name
            type
            value
            isPublic: is_public
            deletedAt: deleted_at
          }
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
      name: profile.nameIsPublic ? profile.name : null,
      nameIsPublic: profile.nameIsPublic,
      bio: profile.bioIsPublic && profile.bio ? profile.bio : null,
      bioIsPublic: profile.bioIsPublic,
      avatar: profile.avatar,
      banner: profile.banner,
      website: profile.websiteIsPublic ? profile.website : null,
      email: profile.emailIsPublic ? profile.email : null,
      discord: profile.discordIsPublic ? profile.discord : null,
      github: profile.githubIsPublic ? profile.github : null,
      twitter: profile.twitterIsPublic ? profile.twitter : null,
      wallets: profile.wallets
        ? profile.wallets
            .filter((wallet) => wallet.deletedAt === null && wallet.isPublic)
            .map(({ id, address, type }) => ({ id, address, type }))
        : [],
      tags: profile.tags
        ? profile.tags
            .filter((tag) => tag.deletedAt === null && tag.isPublic)
            .map(({ id, name, type, value }) => ({ id, name, type, value }))
        : [],
      websiteIsPublic: profile.websiteIsPublic,
      emailIsPublic: profile.emailIsPublic,
      discordIsPublic: profile.discordIsPublic,
      githubIsPublic: profile.githubIsPublic,
      twitterIsPublic: profile.twitterIsPublic,
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
