export default {
  development: {
    username: process.env.DB_USER || "",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_NAME || "",
    port: process.env.DB_PORT || "",
    host: process.env.DB_HOST || "",
    dialect: "mariadb",
    define: {
      charset: "utf8",
      collate: "utf8_general_ci",
      timestamps: true,
    },
  },
  test: {
    username: process.env.DB_USER || "",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_NAME || "",
    port: process.env.DB_PORT || "",
    host: process.env.DB_HOST || "",
    dialect: "mariadb",
    logging: false,
    define: {
      charset: "utf8",
      collate: "utf8_general_ci",
      timestamps: true,
    },
  },
  production: {
    username: process.env.DB_USER || "",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_NAME || "",
    port: process.env.DB_PORT || "",
    host: process.env.DB_HOST || "",
    dialect: "mariadb",
    dialectOptions: {
      ssl: true,
    },
    define: {
      charset: "utf8",
      collate: "utf8_general_ci",
      timestamps: true,
    },
  },
};
