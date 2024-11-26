"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.returnBookController = exports.borrowBookController = exports.createBookController = exports.getBookController = exports.listBooksController = exports.createUserController = exports.getUserController = exports.listUsersController = void 0;
const express_validator_1 = require("express-validator");
const service = __importStar(require("../service/library"));
const handleErrors = (req, res) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
};
const listUsersController = async (req, res) => {
    try {
        const users = await service.listUsers();
        res.json(users);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
};
exports.listUsersController = listUsersController;
const getUserController = async (req, res) => {
    handleErrors(req, res);
    try {
        const user = await service.getUser(parseInt(req.params.id));
        res.json(user);
    }
    catch (err) {
        res.status(404).json({ error: err.message });
    }
};
exports.getUserController = getUserController;
const createUserController = async (req, res) => {
    handleErrors(req, res);
    try {
        const user = await service.createUser(req.body.name);
        res.status(201).json(user);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
};
exports.createUserController = createUserController;
const listBooksController = async (req, res) => {
    try {
        const books = await service.listBooks();
        res.json(books);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
};
exports.listBooksController = listBooksController;
const getBookController = async (req, res) => {
    handleErrors(req, res);
    try {
        const book = await service.getBook(parseInt(req.params.id));
        res.json(book);
    }
    catch (err) {
        res.status(404).json({ error: err.message });
    }
};
exports.getBookController = getBookController;
const createBookController = async (req, res) => {
    handleErrors(req, res);
    try {
        const book = await service.createBook(req.body.name);
        res.status(201).json(book);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
};
exports.createBookController = createBookController;
const borrowBookController = async (req, res) => {
    handleErrors(req, res);
    try {
        await service.borrowBook(parseInt(req.params.userId), parseInt(req.params.bookId));
        res.sendStatus(204);
    }
    catch (err) {
        if (err.message === "This book is already borrowed by another user.") {
            res.status(400).json({ error: err.message });
        }
        else {
            res.status(500).json({ error: err.message });
        }
    }
};
exports.borrowBookController = borrowBookController;
const returnBookController = async (req, res) => {
    handleErrors(req, res);
    try {
        await service.returnBook(parseInt(req.params.borrowId), req.body.score);
        res.sendStatus(204);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
};
exports.returnBookController = returnBookController;
//# sourceMappingURL=library.js.map