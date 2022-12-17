import { Sequelize } from "sequelize";
import config from "./config/config.mjs";

let sequelize;
if (process.env.NODE_ENV === "production") {
  sequelize = new Sequelize(config.production);
} else if (process.env.NODE_ENV === "development") {
  sequelize = new Sequelize(config.development);
} else if (process.env.NODE_ENV === "test") {
  sequelize = new Sequelize(config.test);
}

const connection = sequelize;

export default connection;
