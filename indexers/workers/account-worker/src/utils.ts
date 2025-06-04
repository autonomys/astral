/**
 * Checks if an error is a retriable database error (deadlock, timeout, serialization failure, etc.)
 */
const isRetriableDatabaseError = (error: unknown): boolean => {
  if (!(error instanceof Error)) return false;
  
  const retriableMessages = [
    'deadlock detected',
    'could not serialize access',
    'concurrent update',
    'Query read timeout',
    'query_timeout',
    'statement timeout',
    'canceling statement due to statement timeout',
    'current transaction is aborted',
    'timeout',
    'connection',
    'pool'
  ];
  
  const retriableCodes = [
    '40P01', // PostgreSQL deadlock error code
    '40001', // PostgreSQL serialization failure
    '57014', // PostgreSQL query canceled error code
    '25P02'  // PostgreSQL transaction aborted error code
  ];
  
  // Check error message
  if (retriableMessages.some(msg => error.message.includes(msg))) {
    return true;
  }
  
  // Check error code
  const errorCode = (error as any).code;
  if (errorCode && retriableCodes.includes(errorCode)) {
    return true;
  }
  
  return false;
};

export { isRetriableDatabaseError };
