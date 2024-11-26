import { Sequelize } from "sequelize";

const sequelize = new Sequelize({
  host: process.env.PGHOST,
  username: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  database: process.env.PGDATABASE,
  port: parseInt(process.env.PGPORT || "5432"),
  dialect: "postgres",
  logging: false,
  dialectOptions: {
    ssl: {
      require: true,
    },
  },
});

export default sequelize;
