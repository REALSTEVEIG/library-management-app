"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.returnBook = exports.borrowBook = exports.createBook = exports.getBook = exports.listBooks = exports.createUser = exports.getUser = exports.listUsers = void 0;
const user_1 = __importDefault(require("../models/user"));
const book_1 = __importDefault(require("../models/book"));
const borrow_1 = __importDefault(require("../models/borrow"));
const listUsers = async () => await user_1.default.findAll();
exports.listUsers = listUsers;
const getUser = async (id) => {
    const user = await user_1.default.findByPk(id, {
        include: [
            {
                model: borrow_1.default,
                include: [book_1.default],
            },
        ],
    });
    if (!user)
        throw new Error("User not found");
    return user;
};
exports.getUser = getUser;
const createUser = async (name) => await user_1.default.create({ name });
exports.createUser = createUser;
const listBooks = async () => await book_1.default.findAll();
exports.listBooks = listBooks;
const getBook = async (id) => {
    const book = await book_1.default.findByPk(id);
    if (!book)
        throw new Error("Book not found");
    return {
        id: book.id,
        name: book.name,
        score: book.ratingCount > 0 ? (book.score / book.ratingCount).toFixed(2) : -1,
    };
};
exports.getBook = getBook;
const createBook = async (name) => await book_1.default.create({ name });
exports.createBook = createBook;
const borrowBook = async (userId, bookId) => {
    return await borrow_1.default.create({ userId, bookId });
};
exports.borrowBook = borrowBook;
const returnBook = async (borrowId, score) => {
    const borrow = await borrow_1.default.findByPk(borrowId);
    if (!borrow)
        throw new Error("Borrow record not found");
    const book = await book_1.default.findByPk(borrow.bookId);
    if (!book)
        throw new Error("Book not found");
    book.ratingCount++;
    book.score += score;
    await book.save();
    borrow.returned = true;
    borrow.score = score;
    await borrow.save();
};
exports.returnBook = returnBook;
//# sourceMappingURL=library.js.map