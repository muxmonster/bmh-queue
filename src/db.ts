import knex from "knex";
import dotenv from "dotenv";

dotenv.config();

export const db = knex({
  client: process.env.DB_CLIENT || "mysql2",
  connection: {
    host: process.env.DB_HOST!,
    port: Number(process.env.DB_PORT || 3306),
    user: process.env.DB_USER!,
    password: process.env.DB_PASSWORD!,
    database: process.env.DB_NAME!,
  },
  pool: { min: 0, max: 10 },
});
