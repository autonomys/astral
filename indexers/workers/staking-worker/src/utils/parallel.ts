/**
 * Utility functions for parallel processing with concurrency control
 */

import { config } from '../config';

/**
 * Process items in parallel with a concurrency limit
 * @param items Array of items to process
 * @param processor Function to process each item
 * @param concurrencyLimit Maximum number of concurrent operations
 * @returns Array of results in the same order as input
 */
export const processInParallel = async <T, R>(
  items: T[],
  processor: (item: T) => Promise<R>,
  concurrencyLimit?: number,
): Promise<R[]> => {
  const limit = concurrencyLimit || Math.floor(config.dbPoolSize * 0.8); // Use 80% of pool by default
  const results: R[] = new Array(items.length);
  const executing = new Set<Promise<void>>();

  for (let i = 0; i < items.length; i++) {
    const promise = processor(items[i])
      .then((result) => {
        results[i] = result;
      })
      .finally(() => {
        executing.delete(promise);
      });

    executing.add(promise);

    // If we've reached the concurrency limit, wait for one to complete
    if (executing.size >= limit) {
      await Promise.race(executing);
    }
  }

  // Wait for all remaining promises
  await Promise.all(executing);

  return results;
};

/**
 * Process items in batches with parallel processing within each batch
 * @param items Array of items to process
 * @param processor Function to process each item
 * @param batchSize Size of each batch
 * @param concurrencyLimit Maximum number of concurrent operations per batch
 * @returns Array of results
 */
export const processInBatches = async <T, R>(
  items: T[],
  processor: (item: T) => Promise<R>,
  batchSize?: number,
  concurrencyLimit?: number,
): Promise<R[]> => {
  const size = batchSize || config.batchSize;
  const results: R[] = [];

  for (let i = 0; i < items.length; i += size) {
    const batch = items.slice(i, i + size);
    const batchResults = await processInParallel(batch, processor, concurrencyLimit);
    results.push(...batchResults);
  }

  return results;
};

/**
 * Group items by a key function and process each group in parallel
 * This helps avoid deadlocks by ensuring items that might conflict are processed together
 */
export const processGroupedInParallel = async <T, K, R>(
  items: T[],
  keyFn: (item: T) => K,
  processor: (items: T[]) => Promise<R>,
  concurrencyLimit?: number,
): Promise<R[]> => {
  // Group items by key
  const groups = new Map<K, T[]>();
  for (const item of items) {
    const key = keyFn(item);
    const group = groups.get(key) || [];
    group.push(item);
    groups.set(key, group);
  }

  // Process each group in parallel
  const groupEntries = Array.from(groups.values());
  return processInParallel(groupEntries, processor, concurrencyLimit);
};

/**
 * Retry a function with exponential backoff
 */
export const retryWithBackoff = async <T>(
  fn: () => Promise<T>,
  maxRetries: number = config.maxRetries,
  baseDelay: number = config.retryDelayMs,
): Promise<T> => {
  let lastError: Error;

  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error as Error;

      // Check if it's a deadlock error (PostgreSQL error code 40P01)
      if ((error as any).code === '40P01') {
        console.log(`Deadlock detected, retrying attempt ${attempt + 1}/${maxRetries}...`);
      }

      if (attempt < maxRetries - 1) {
        const delay = baseDelay * Math.pow(2, attempt);
        await new Promise((resolve) => setTimeout(resolve, delay));
      }
    }
  }

  throw lastError!;
};
