import { Sequelize } from "sequelize";
import { execSync } from "child_process";

export const SequelizeHelper = {
  sequelize: new Sequelize(
    process.env.DATABASE_URL as string, {
      dialect: "postgres",
      logging: false,
      timezone: "-03:00",
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false,
        }
      }
    }
  ),
  async connect() {
    await this.sequelize.authenticate();
  },

  async reset() {
    execSync("npm run db:reset");
  },
};
