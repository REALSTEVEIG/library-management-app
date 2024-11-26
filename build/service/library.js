"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.returnBook = exports.borrowBook = exports.createBook = exports.getBook = exports.listBooks = exports.createUser = exports.getUser = exports.listUsers = void 0;
const association_1 = require("../models/association");
const listUsers = async () => await association_1.User.findAll();
exports.listUsers = listUsers;
const getUser = async (id) => {
    const user = await association_1.User.findByPk(id, {
        include: [
            {
                model: association_1.Borrow,
                include: [association_1.Book],
                required: false,
            },
        ],
    });
    if (!user)
        throw new Error("User not found");
    const past = user.Borrows?.filter((borrow) => borrow.returned).map((borrow) => ({
        name: borrow.Book?.name,
        userScore: borrow.score,
    })) || [];
    const present = user.Borrows?.filter((borrow) => !borrow.returned).map((borrow) => ({
        name: borrow.Book?.name,
    })) || [];
    return {
        id: user.id,
        name: user.name,
        books: {
            past,
            present,
        },
    };
};
exports.getUser = getUser;
const createUser = async (name) => await association_1.User.create({ name });
exports.createUser = createUser;
const listBooks = async () => await association_1.Book.findAll();
exports.listBooks = listBooks;
const getBook = async (id) => {
    const book = await association_1.Book.findByPk(id);
    if (!book)
        throw new Error("Book not found");
    return {
        id: book.id,
        name: book.name,
        score: book.ratingCount > 0 ? (book.score / book.ratingCount).toFixed(2) : -1,
    };
};
exports.getBook = getBook;
const createBook = async (name) => await association_1.Book.create({ name });
exports.createBook = createBook;
const borrowBook = async (userId, bookId) => {
    const existingBorrow = await association_1.Borrow.findOne({
        where: { bookId, returned: false },
    });
    if (existingBorrow) {
        throw new Error("This book is already borrowed by another user.");
    }
    return await association_1.Borrow.create({ userId, bookId });
};
exports.borrowBook = borrowBook;
const returnBook = async (borrowId, score) => {
    const borrow = await association_1.Borrow.findByPk(borrowId);
    if (!borrow)
        throw new Error("Borrow record not found");
    const book = await association_1.Book.findByPk(borrow.bookId);
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