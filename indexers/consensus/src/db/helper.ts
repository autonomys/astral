import { sql } from "./client.ts";

const POSTGRES_MAX_PARAMS = 65500; // 65535;

export const insert = async (
  table: string,
  columns: string[],
  data: (string | number | boolean | string[] | Date)[][],
  sqlClient?: typeof sql,
  onConflict?: string
) => {
  // Handle empty data case: no operations to perform.
  if (data.length === 0) {
    return []; // Returns Promise.resolve([]) due to async
  }

  // Ensure there are columns to insert.
  if (columns.length === 0) {
    throw new Error("Cannot insert with zero columns.");
  }

  // Validate that the first row of data matches the number of columns.
  // This matches the original code's check, now guarded by data.length > 0.
  if (columns.length !== data[0].length) {
    throw new Error(
      `Columns count (${columns.length}) and data row length (${data[0].length}) mismatch for the first row.`
    );
  }

  const numColumns = columns.length;
  const maxRowsPerChunk = Math.floor(POSTGRES_MAX_PARAMS / numColumns);

  // If numColumns is very large, maxRowsPerChunk could be 0.
  // This means even a single row exceeds the parameter limit.
  if (maxRowsPerChunk === 0) {
    throw new Error(
      `A single row with ${numColumns} columns exceeds the PostgreSQL parameter limit of ${POSTGRES_MAX_PARAMS}. ` +
        `Cannot insert.`
    );
  }

  const client = sqlClient || sql;
  const promises = []; // Store promises for each chunk query

  for (let i = 0; i < data.length; i += maxRowsPerChunk) {
    const chunk = data.slice(i, i + maxRowsPerChunk);

    if (chunk.length === 0) {
      // This should ideally not be hit if data.length > 0 and maxRowsPerChunk > 0.
      // Included as a safeguard.
      continue;
    }

    // Validate all rows in the current chunk.
    for (let rowIndex = 0; rowIndex < chunk.length; rowIndex++) {
      const row = chunk[rowIndex];
      if (row.length !== numColumns) {
        throw new Error(
          `Data row at overall index ${i + rowIndex} (chunk index ${rowIndex}) has ${row.length} items, ` +
            `but ${numColumns} columns were specified.`
        );
      }
    }

    // Build placeholders for the SQL query for the current chunk
    const placeholders = chunk
      .map((_, k) => {
        // k is index within the current chunk
        const offset = k * numColumns;
        return `(${Array.from({ length: numColumns }, (_, j) => `$${offset + j + 1}`).join(", ")})`;
      })
      .join(", ");

    // Flatten the values array for the current chunk
    const flatValues = chunk.flat();

    // Build the SQL query for the current chunk
    const query = `
      INSERT INTO ${table} (
        ${columns.join(", ")}
      )
      VALUES ${placeholders}
      ${onConflict ? `ON CONFLICT ${onConflict}` : ""}
    `;

    promises.push(client.unsafe(query, flatValues));
  }

  // Execute all chunk queries and wait for them to complete.
  // Returns a Promise that resolves to an array of results from each query.
  return await Promise.all(promises);
};
