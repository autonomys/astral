
/**
 * Helper function to retry a database operation with exponential backoff
 */
const retryOperation = async <T>(
  operation: () => Promise<T>,
  maxRetries: number = 2,
  initialDelay: number = 50
): Promise<T> => {
  let lastError: Error;
  
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await operation();
    } catch (error) {
      lastError = error as Error;
      
      // Don't retry if it's the last attempt
      if (attempt === maxRetries) {
        throw error;
      }
      
      // Calculate delay with exponential backoff (capped at 1 second for fast systems)
      const delay = Math.min(initialDelay * Math.pow(2, attempt), 1000);
      console.log(`Attempt ${attempt + 1} failed, retrying in ${delay}ms...`);
      
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
  
  throw lastError!;
};

export { retryOperation };
