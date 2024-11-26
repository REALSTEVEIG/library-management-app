"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Borrow = exports.Book = exports.User = void 0;
const user_1 = __importDefault(require("./user"));
exports.User = user_1.default;
const book_1 = __importDefault(require("./book"));
exports.Book = book_1.default;
const borrow_1 = __importDefault(require("./borrow"));
exports.Borrow = borrow_1.default;
user_1.default.hasMany(borrow_1.default, { foreignKey: "userId" });
borrow_1.default.belongsTo(user_1.default, { foreignKey: "userId" });
book_1.default.hasMany(borrow_1.default, { foreignKey: "bookId" });
borrow_1.default.belongsTo(book_1.default, { foreignKey: "bookId" });
//# sourceMappingURL=association.js.map