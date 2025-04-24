import postgres from "postgres";

const DB_USER = Deno.env.get("DB_USER") || "postgres";
const DB_PASS = Deno.env.get("DB_PASS") || "postgres";
const DB_DATABASE = Deno.env.get("DB_DATABASE") || "postgres";
const DB_HOST = Deno.env.get("DB_HOST") || "localhost";
const DB_PORT = Deno.env.get("DB_PORT") || "5432";

const POSTGRES_URL = `postgres://${DB_USER}:${DB_PASS}@${DB_HOST}:${DB_PORT}/${DB_DATABASE}`;

export const sql = postgres(POSTGRES_URL, { debug: true });
