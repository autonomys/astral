/**
 * Utility functions for staking worker
 */

/**
 * Convert shares to amount based on share price
 */
export const sharesToAmount = (
  shares: bigint,
  sharePrice: bigint,
  precision: bigint = BigInt(1e18),
): bigint => {
  // TODO: Implement shares to amount conversion
  return (shares * sharePrice) / precision;
};

/**
 * Convert amount to shares based on share price
 */
export const amountToShares = (
  amount: bigint,
  sharePrice: bigint,
  precision: bigint = BigInt(1e18),
): bigint => {
  // TODO: Implement amount to shares conversion
  if (sharePrice === BigInt(0)) {
    return BigInt(0);
  }
  return (amount * precision) / sharePrice;
};

/**
 * Calculate percentage yield
 */
export const calculateYield = (
  initialAmount: bigint,
  finalAmount: bigint,
  decimals: number = 4,
): number => {
  // TODO: Implement yield calculation
  if (initialAmount === BigInt(0)) {
    return 0;
  }
  const yieldBigInt = ((finalAmount - initialAmount) * BigInt(10 ** decimals)) / initialAmount;
  return Number(yieldBigInt) / 10 ** decimals;
};

/**
 * Parse JSON safely with error handling
 */
export const safeParseJson = <T>(jsonString: string, defaultValue: T): T => {
  try {
    return JSON.parse(jsonString) as T;
  } catch (error) {
    console.error('Failed to parse JSON:', error);
    return defaultValue;
  }
};

/**
 * Sleep for a specified duration
 */
export const sleep = (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

/**
 * Batch array into chunks
 */
export const batchArray = <T>(array: T[], batchSize: number): T[][] => {
  const batches: T[][] = [];
  for (let i = 0; i < array.length; i += batchSize) {
    batches.push(array.slice(i, i + batchSize));
  }
  return batches;
};

/**
 * Retry a function with exponential backoff
 */
export const retryWithBackoff = async <T>(
  fn: () => Promise<T>,
  maxRetries: number = 3,
  initialDelay: number = 1000,
): Promise<T> => {
  let lastError: Error;

  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error as Error;
      if (i < maxRetries - 1) {
        const delay = initialDelay * Math.pow(2, i);
        console.log(`Retry ${i + 1}/${maxRetries} after ${delay}ms...`);
        await sleep(delay);
      }
    }
  }

  throw lastError!;
};
