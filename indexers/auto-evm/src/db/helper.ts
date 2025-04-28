import { sql } from "./client.ts";

export const insert = async (
  table: string,
  columns: string[],
  data: (string | number | boolean | string[] | Date)[][],
  sqlClient?: typeof sql,
  onConflict?: string
) => {
  if (columns.length !== data[0].length)
    throw new Error("Columns and data length mismatch");

  const length = columns.length;

  // Build placeholders for the SQL query
  const placeholders = data
    .map((_, i) => {
      const offset = i * length;
      return `(${Array.from({ length }, (_, j) => `$${offset + j + 1}`).join(", ")})`;
    })
    .join(", ");

  // Flatten the values array
  const flatValues = data.flat();

  // Build the SQL query
  const query = `
    INSERT INTO ${table} (
      ${columns.join(", ")}
    )
    VALUES ${placeholders}
    ${onConflict ? `ON CONFLICT ${onConflict}` : ""}
  `;

  return await (sqlClient || sql).unsafe(query, flatValues);
};
