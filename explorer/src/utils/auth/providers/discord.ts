import { SupportedWalletExtension } from '@/constants/wallet'
import { AuthProvider } from 'constants/session'
import type { TokenSet } from 'next-auth'
import { User } from 'next-auth'
import type { DiscordProfile } from 'next-auth/providers/discord'
import DiscordProvider from 'next-auth/providers/discord'
import { findUserByID, saveUser } from '../user'
import {
  getUserRoles,
  giveMainnetDiscordFarmerRole,
  giveMainnetDiscordNominatorRole,
  giveMainnetDiscordOperatorRole,
  giveMainnetDiscordTalismanFarmerRole,
  giveTaurusDiscordFarmerRole,
  giveTaurusDiscordNominatorRole,
  giveTaurusDiscordOperatorRole,
  verifyDiscordGuildMember,
  verifyMainnetDiscordFarmerRole,
  verifyMainnetDiscordNominatorRole,
  verifyMainnetDiscordOperatorRole,
  verifyMainnetDiscordTalismanFarmerRole,
  verifyTaurusDiscordFarmerRole,
  verifyTaurusDiscordNominatorRole,
  verifyTaurusDiscordOperatorRole,
} from '../vcs/discord'
import { verifyToken } from '../verifyToken'

const { DISCORD_CLIENT_ID, DISCORD_CLIENT_SECRET } = process.env

export const Discord = () => {
  return DiscordProvider({
    // client credentials
    clientId: DISCORD_CLIENT_ID || '',
    clientSecret: DISCORD_CLIENT_SECRET || '',

    // open id connect scopes
    authorization: { params: { scope: 'identify guilds guilds.members.read' } },

    // fetch discord profile
    profile: async (profile: DiscordProfile, token: TokenSet) => {
      try {
        if (!token.access_token) throw new Error('No access token')

        const session = verifyToken()
        const did = 'did:openid:discord:' + profile.id

        const member = await verifyDiscordGuildMember(token.access_token)
        const roles = await getUserRoles(token.access_token)
        let mainnetFarmer = await verifyMainnetDiscordFarmerRole(roles)
        let mainnetOperator = await verifyMainnetDiscordOperatorRole(roles)
        let mainnetNominator = await verifyMainnetDiscordNominatorRole(roles)
        let taurusFarmer = await verifyTaurusDiscordFarmerRole(roles)
        let taurusOperator = await verifyTaurusDiscordOperatorRole(roles)
        let taurusNominator = await verifyTaurusDiscordNominatorRole(roles)
        let mainnetTalismanFarmer = await verifyMainnetDiscordTalismanFarmerRole(roles)

        let newRolesAdded = false
        const savedUser = await findUserByID(did)
        // Exit if the Discord ID does not match (prevent a user to link multiple Discord accounts to the same account)
        if (savedUser && savedUser.data && savedUser.data.discord?.id !== profile.id)
          throw new Error('Discord ID does not match')

        if (session.subspace?.vcs.mainnetFarmer && !mainnetFarmer) {
          await giveMainnetDiscordFarmerRole(profile.id)
          newRolesAdded = true
        }
        if (session.subspace?.vcs.mainnetOperator && !mainnetOperator) {
          await giveMainnetDiscordOperatorRole(profile.id)
          newRolesAdded = true
        }
        if (session.subspace?.vcs.mainnetNominator && !mainnetNominator) {
          await giveMainnetDiscordNominatorRole(profile.id)
          newRolesAdded = true
        }
        if (session.subspace?.vcs.taurusFarmer && !taurusFarmer) {
          await giveTaurusDiscordFarmerRole(profile.id)
          newRolesAdded = true
        }
        if (session.subspace?.vcs.taurusOperator && !taurusOperator) {
          await giveTaurusDiscordOperatorRole(profile.id)
          newRolesAdded = true
        }
        if (session.subspace?.vcs.taurusNominator && !taurusNominator) {
          await giveTaurusDiscordNominatorRole(profile.id)
          newRolesAdded = true
        }
        // Temporary VCs
        if (
          session.subspace?.source === SupportedWalletExtension.Talisman &&
          session.subspace?.vcs.mainnetTalismanFarmer &&
          !mainnetTalismanFarmer
        ) {
          await giveMainnetDiscordTalismanFarmerRole(profile.id)
          newRolesAdded = true
        }
        if (newRolesAdded) {
          const newRoles = await getUserRoles(token.access_token)
          mainnetFarmer = await verifyMainnetDiscordFarmerRole(newRoles)
          mainnetOperator = await verifyMainnetDiscordOperatorRole(newRoles)
          mainnetNominator = await verifyMainnetDiscordNominatorRole(newRoles)
          taurusFarmer = await verifyTaurusDiscordFarmerRole(newRoles)
          taurusOperator = await verifyTaurusDiscordOperatorRole(newRoles)
          taurusNominator = await verifyTaurusDiscordNominatorRole(newRoles)
          mainnetTalismanFarmer = await verifyMainnetDiscordTalismanFarmerRole(newRoles)
        }

        const user: User = {
          id: session.id || did,
          DIDs: [...(savedUser?.data?.DIDs || []), ...session.DIDs, did],
          subspace: session.subspace,
          discord: {
            ...(savedUser?.data?.discord ?? {}),
            id: profile.id,
            username: profile.username,
            vcs: {
              ...(savedUser?.data?.discord?.vcs ?? {}),
              member,
              roles: {
                mainnetFarmer,
                mainnetOperator,
                mainnetNominator,
                taurusFarmer,
                taurusOperator,
                taurusNominator,
                // Temporary VCs
                mainnetTalismanFarmer,
              },
            },
          },
        }

        await saveUser(user.id, {
          ...user,
          createdAt: new Date(),
          updatedAt: new Date(),
        })

        return user
      } catch (error) {
        console.error('Error fetching Discord profile:', error)
        throw new Error('Failed to fetch Discord profile')
      }
    },
  })
}
