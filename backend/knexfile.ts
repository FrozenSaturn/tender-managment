import { Knex } from "knex";

const config: Knex.Config = {
  client: "postgresql",
  connection: {
    host: "localhost",
    database: "tender_management",
    user: process.env.USER,
    password: "",
    port: 5432,
  },
  migrations: {
    directory: "./src/db/migrations",
  },
};

export default config;
