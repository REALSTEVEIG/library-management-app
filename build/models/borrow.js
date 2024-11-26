"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const config_1 = __importDefault(require("../config/config"));
const user_1 = __importDefault(require("./user"));
const book_1 = __importDefault(require("./book"));
class Borrow extends sequelize_1.Model {
}
Borrow.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    userId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: user_1.default,
            key: "id",
        },
    },
    bookId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: book_1.default,
            key: "id",
        },
    },
    returned: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: false,
    },
    score: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: true,
    },
}, {
    sequelize: config_1.default,
    tableName: "borrows",
    timestamps: false,
});
Borrow.belongsTo(user_1.default, { foreignKey: "userId" });
Borrow.belongsTo(book_1.default, { foreignKey: "bookId" });
exports.default = Borrow;
//# sourceMappingURL=borrow.js.map