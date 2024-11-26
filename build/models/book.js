"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const config_1 = __importDefault(require("../config/config"));
class Book extends sequelize_1.Model {
}
Book.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    score: {
        type: sequelize_1.DataTypes.FLOAT,
        defaultValue: 0,
    },
    ratingCount: {
        type: sequelize_1.DataTypes.INTEGER,
        defaultValue: 0,
    },
}, {
    sequelize: config_1.default,
    tableName: "books",
    timestamps: false,
});
exports.default = Book;
//# sourceMappingURL=book.js.map