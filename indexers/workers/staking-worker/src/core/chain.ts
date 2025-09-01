import { getChainHead } from '../services/autonomysService';
import { storeChainTip } from '../services/redisService';

// Current chain height for finality checking
let currentChainHeight = 0;

/**
 * Refresh the current chain head height for finality checking
 */
export const refreshChainHeadHeight = async (): Promise<void> => {
  try {
    currentChainHeight = Number(await getChainHead());

    // Store in Redis for distributed access
    await storeChainTip(currentChainHeight);

    console.log(`Worker: Updated chain head height to ${currentChainHeight}`);
  } catch (error) {
    console.error('Worker: Failed to refresh chain head height:', error);
  }
};
