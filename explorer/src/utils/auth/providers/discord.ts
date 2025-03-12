import { AuthProvider } from 'constants/session'
import type { TokenSet } from 'next-auth'
import { User } from 'next-auth'
import type { DiscordProfile } from 'next-auth/providers/discord'
import DiscordProvider from 'next-auth/providers/discord'
import { findUserByID, saveUser, updateUser } from 'utils/fauna'
import { log } from 'utils/log'
import {
  getUserRoles,
  giveMainnetDiscordFarmerRole,
  giveMainnetDiscordNominatorRole,
  giveMainnetDiscordOperatorRole,
  giveTaurusDiscordFarmerRole,
  giveTaurusDiscordNominatorRole,
  giveTaurusDiscordOperatorRole,
  verifyDiscordGuildMember,
  verifyMainnetDiscordFarmerRole,
  verifyMainnetDiscordNominatorRole,
  verifyMainnetDiscordOperatorRole,
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
    authorization: { params: { scope: 'identify guilds guilds.join guilds.members.read' } },

    // fetch discord profile
    profile: async (profile: DiscordProfile, token: TokenSet) => {
      try {
        log('profile', 'discord', 'profile', profile)
        if (!token.access_token) throw new Error('No access token')

        const session = verifyToken()
        log('profile', 'discord', 'session', session)
        const did = 'did:openid:discord:' + profile.id
        log('profile', 'discord', 'did', did)

        const member = await verifyDiscordGuildMember(token.access_token)
        log('profile', 'discord', 'member', member)
        const roles = await getUserRoles(token.access_token)
        log('profile', 'discord', 'roles', roles)
        let mainnetFarmer = await verifyMainnetDiscordFarmerRole(roles)
        log('profile', 'discord', 'mainnetFarmer', mainnetFarmer)
        let mainnetOperator = await verifyMainnetDiscordOperatorRole(roles)
        log('profile', 'discord', 'mainnetOperator', mainnetOperator)
        let mainnetNominator = await verifyMainnetDiscordNominatorRole(roles)
        log('profile', 'discord', 'mainnetNominator', mainnetNominator)
        let taurusFarmer = await verifyTaurusDiscordFarmerRole(roles)
        log('profile', 'discord', 'taurusFarmer', taurusFarmer)
        let taurusOperator = await verifyTaurusDiscordOperatorRole(roles)
        log('profile', 'discord', 'taurusOperator', taurusOperator)
        let taurusNominator = await verifyTaurusDiscordNominatorRole(roles)
        log('profile', 'discord', 'taurusNominator', taurusNominator)

        let newRolesAdded = false
        const savedUser = await findUserByID(did)
        log('profile', 'discord', 'savedUser', savedUser)
        // Exit if the Discord ID does not match (prevent a user to link multiple Discord accounts to the same account)
        if (savedUser && savedUser[0].data.discord?.id !== profile.id)
          throw new Error('Discord ID does not match')

        if (session.subspace?.vcs.mainnetFarmer && !mainnetFarmer) {
          log('profile', 'discord', 'giving mainnet farmer role')
          await giveMainnetDiscordFarmerRole(profile.id)
          newRolesAdded = true
        }
        if (session.subspace?.vcs.mainnetOperator && !mainnetOperator) {
          log('profile', 'discord', 'giving mainnet operator role')
          await giveMainnetDiscordOperatorRole(profile.id)
          newRolesAdded = true
        }
        if (session.subspace?.vcs.mainnetNominator && !mainnetNominator) {
          log('profile', 'discord', 'giving mainnet nominator role')
          await giveMainnetDiscordNominatorRole(profile.id)
          newRolesAdded = true
        }
        if (session.subspace?.vcs.taurusFarmer && !taurusFarmer) {
          log('profile', 'discord', 'giving taurus farmer role')
          await giveTaurusDiscordFarmerRole(profile.id)
          newRolesAdded = true
        }
        if (session.subspace?.vcs.taurusOperator && !taurusOperator) {
          log('profile', 'discord', 'giving taurus operator role')
          await giveTaurusDiscordOperatorRole(profile.id)
          newRolesAdded = true
        }
        if (session.subspace?.vcs.taurusNominator && !taurusNominator) {
          log('profile', 'discord', 'giving taurus nominator role')
          await giveTaurusDiscordNominatorRole(profile.id)
          newRolesAdded = true
        }
        if (newRolesAdded) {
          log('profile', 'discord', 'getting new roles')
          const newRoles = await getUserRoles(token.access_token)
          log('profile', 'discord', 'newRoles', newRoles)
          mainnetFarmer = await verifyMainnetDiscordFarmerRole(newRoles)
          log('profile', 'discord', 'mainnetFarmer', mainnetFarmer)
          mainnetOperator = await verifyMainnetDiscordOperatorRole(newRoles)
          log('profile', 'discord', 'mainnetOperator', mainnetOperator)
          mainnetNominator = await verifyMainnetDiscordNominatorRole(newRoles)
          log('profile', 'discord', 'mainnetNominator', mainnetNominator)
          taurusFarmer = await verifyTaurusDiscordFarmerRole(newRoles)
          log('profile', 'discord', 'taurusFarmer', taurusFarmer)
          taurusOperator = await verifyTaurusDiscordOperatorRole(newRoles)
          log('profile', 'discord', 'taurusOperator', taurusOperator)
          taurusNominator = await verifyTaurusDiscordNominatorRole(newRoles)
          log('profile', 'discord', 'taurusNominator', taurusNominator)
        }

        const user: User = {
          id: session.id || did,
          DIDs: [...session.DIDs, did],
          subspace: session.subspace,
          discord: {
            id: profile.id,
            username: profile.username,
            vcs: {
              member,
              roles: {
                mainnetFarmer,
                mainnetOperator,
                mainnetNominator,
                taurusFarmer,
                taurusOperator,
                taurusNominator,
              },
            },
          },
        }
        log('profile', 'discord', 'user', user)
        if (!savedUser || savedUser.length === 0) {
          log('profile', 'discord', 'saving user')
          await saveUser(user)
          log('profile', 'discord', 'saved user')

          return user
        }
        log('profile', 'discord', 'updating user')
        await updateUser(
          savedUser[0].ref,
          savedUser[0].data,
          AuthProvider.discord,
          user.discord ?? {},
        )
        log('profile', 'discord', 'updated user')
        const updatedUser = {
          ...savedUser[0].data,
          [AuthProvider.subspace]: user[AuthProvider.subspace],
        }
        log('profile', 'discord', 'updatedUser', updatedUser)
        return updatedUser
      } catch (error) {
        console.error('Error fetching Discord profile:', error)
        throw new Error('Failed to fetch Discord profile')
      }
    },
  })
}
