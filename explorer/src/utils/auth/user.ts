import { UserSession } from '@autonomys/user-session'
import { SavedUser } from 'next-auth'

const { findUserByID, saveUser } = UserSession<SavedUser>({
  apiKey: process.env.AUTO_DRIVE_API_KEY || '',
  network: 'mainnet',
  rpcUrl: process.env.AUTO_EVM_RPC_URL || '',
  address: process.env.USER_SESSION_CONTRACT_ADDRESS || '',
  privateKey: process.env.USER_SESSION_PRIVATE_KEY || '',
  password: process.env.USER_SESSION_PASSWORD,
  fileName: 'explorer-user-session.json',
})

export { findUserByID, saveUser }
