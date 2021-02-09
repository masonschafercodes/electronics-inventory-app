require("dotenv").config();

module.exports = {
  development: {
    client: "pg",
    connection: {
      host: process.env.HOST_URI,
      user: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
    },
    migrations: {
      directory: "./db/migrations",
    },
    seeds: {
      directory: "./db/seeds",
    },
  },
};
