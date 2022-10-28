/**
 * Utility function to get error message from error
 * @param {unknown} error - can be instance of Error object or string
 * @returns {string} - error message
 */
 export function getErrorMessage(error: unknown): string | undefined {
  if (error instanceof Error) {
    return error.message;
  } else if (typeof error === 'string') {
    return error;
  } else {
    return;
  }
}
