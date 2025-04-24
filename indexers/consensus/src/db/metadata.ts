import postgres from "postgres";
import { MetadataKey } from "../structures/metadata.ts";
import { sql } from "./client.ts";

export const getMetadata = async () =>
  await sql`SELECT * FROM consensus._metadata`;

export const getLastProcessedHeight = (
  metadata: postgres.RowList<postgres.Row[]>
): number => {
  const result = metadata.find(
    (m) => m.key === MetadataKey.LastProcessedHeight
  );
  if (!result) return 0;
  return parseInt(result.value);
};

export const updateMetadata = async (
  key: MetadataKey,
  value: number,
  sqlClient?: typeof sql
) =>
  await (sqlClient || sql)`
    INSERT INTO consensus._metadata (key, value, "createdAt", "updatedAt")
    VALUES (${key}::text, 
            ${value}::jsonb,
            NOW(),
            NOW())
    ON CONFLICT (key) 
    DO UPDATE SET 
      value = ${value}::jsonb,
      "updatedAt" = NOW()
    WHERE consensus._metadata.key = ${key}::text
  `;

export const updateLastProcessedHeight = async (
  lastProcessedHeight: number,
  sqlClient?: typeof sql
) =>
  await updateMetadata(
    MetadataKey.LastProcessedHeight,
    lastProcessedHeight,
    sqlClient
  );

export const updateTargetHeight = async (
  targetHeight: number,
  sqlClient?: typeof sql
) => await updateMetadata(MetadataKey.TargetHeight, targetHeight, sqlClient);
