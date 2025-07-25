/**
 * Service utility functions for staking worker
 */

/**
 * Format database timestamp
 */
export const formatTimestamp = (date: Date): string => {
  return date.toISOString();
};

/**
 * Parse database timestamp
 */
export const parseTimestamp = (timestamp: string): Date => {
  return new Date(timestamp);
};

/**
 * Convert BigInt to database numeric string
 */
export const bigintToNumeric = (value: bigint): string => {
  return value.toString();
};

/**
 * Convert database numeric string to BigInt
 */
export const numericToBigint = (value: string | number): bigint => {
  return BigInt(value.toString());
};

/**
 * Build database update query
 */
export const buildUpdateQuery = (
  tableName: string,
  updates: Record<string, any>,
  conditions: Record<string, any>,
): { query: string; values: any[] } => {
  // TODO: Implement query builder
  const setClause = Object.keys(updates)
    .map((key, index) => `"${key}" = $${index + 1}`)
    .join(', ');

  const whereClause = Object.keys(conditions)
    .map((key, index) => `"${key}" = $${Object.keys(updates).length + index + 1}`)
    .join(' AND ');

  const query = `UPDATE ${tableName} SET ${setClause} WHERE ${whereClause}`;
  const values = [...Object.values(updates), ...Object.values(conditions)];

  return { query, values };
};

/**
 * Build batch insert query
 */
export const buildBatchInsertQuery = (
  tableName: string,
  records: Record<string, any>[],
): { query: string; values: any[] } => {
  if (records.length === 0) {
    throw new Error('No records to insert');
  }

  // TODO: Implement batch insert query builder
  const columns = Object.keys(records[0]);
  const values: any[] = [];
  const valuesClauses: string[] = [];

  records.forEach((record, recordIndex) => {
    const placeholders = columns.map((_, colIndex) => {
      const paramIndex = recordIndex * columns.length + colIndex + 1;
      return `$${paramIndex}`;
    });
    valuesClauses.push(`(${placeholders.join(', ')})`);
    values.push(...columns.map((col) => record[col]));
  });

  const query = `
    INSERT INTO ${tableName} (${columns.map((c) => `"${c}"`).join(', ')})
    VALUES ${valuesClauses.join(', ')}
    ON CONFLICT DO NOTHING
  `;

  return { query, values };
};

/**
 * Sanitize SQL identifier
 */
export const sanitizeIdentifier = (identifier: string): string => {
  // Remove any characters that could be used for SQL injection
  return identifier.replace(/[^a-zA-Z0-9_]/g, '');
};

/**
 * Create Redis key with prefix
 */
export const createRedisKey = (...parts: string[]): string => {
  return parts.join(':');
};

/**
 * Parse Redis key
 */
export const parseRedisKey = (key: string): string[] => {
  return key.split(':');
};
