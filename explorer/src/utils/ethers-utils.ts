// Optimized ethers imports - only import what we need
import { formatUnits, isAddress } from 'ethers'

// Re-export only the functions we use
export { formatUnits, isAddress }

// Type-safe wrapper for isAddress to avoid naming conflicts
export const isEvmAddress = isAddress
