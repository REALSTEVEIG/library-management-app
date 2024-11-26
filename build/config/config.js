"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize = new sequelize_1.Sequelize({
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
exports.default = sequelize;
//# sourceMappingURL=config.js.map