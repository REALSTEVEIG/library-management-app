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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const controller = __importStar(require("../controller/library"));
const router = express_1.default.Router();
// User routes
router.get("/users", controller.listUsersController);
router.get("/users/:id", [(0, express_validator_1.param)("id").isInt()], controller.getUserController);
router.post("/users", [(0, express_validator_1.body)("name").notEmpty()], controller.createUserController);
// Book routes
router.get("/books", controller.listBooksController);
router.get("/books/:id", [(0, express_validator_1.param)("id").isInt()], controller.getBookController);
router.post("/books", [(0, express_validator_1.body)("name").notEmpty()], controller.createBookController);
// Borrow/Return routes
router.post("/users/:userId/borrow/:bookId", [(0, express_validator_1.param)("userId").isInt(), (0, express_validator_1.param)("bookId").isInt()], controller.borrowBookController);
router.post("/users/:userId/return/:borrowId", [(0, express_validator_1.param)("borrowId").isInt(), (0, express_validator_1.body)("score").isFloat({ min: 0, max: 10 })], controller.returnBookController);
exports.default = router;
/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: The user ID
 *         name:
 *           type: string
 *           description: The user's name
 *     Book:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: The book ID
 *         name:
 *           type: string
 *           description: The book's name
 *         score:
 *           type: number
 *           description: The book's average score
 *     Borrow:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: The borrow record ID
 *         userId:
 *           type: integer
 *           description: The ID of the user who borrowed the book
 *         bookId:
 *           type: integer
 *           description: The ID of the borrowed book
 *         returned:
 *           type: boolean
 *           description: Indicates if the book has been returned
 *         score:
 *           type: number
 *           description: The user's score for the book
 */
/**
 * @swagger
 * /users:
 *   get:
 *     summary: List all users
 *     responses:
 *       200:
 *         description: A list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *   post:
 *     summary: Create a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "John Doe"
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 */
/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Get information about a user
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The user ID
 *     responses:
 *       200:
 *         description: User information
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: User not found
 */
/**
 * @swagger
 * /books:
 *   get:
 *     summary: List all books
 *     responses:
 *       200:
 *         description: A list of books
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Book'
 *   post:
 *     summary: Create a new book
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "1984"
 *     responses:
 *       201:
 *         description: Book created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 */
/**
 * @swagger
 * /books/{id}:
 *   get:
 *     summary: Get information about a book
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The book ID
 *     responses:
 *       200:
 *         description: Book information
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 *       404:
 *         description: Book not found
 */
/**
 * @swagger
 * /users/{userId}/borrow/{bookId}:
 *   post:
 *     summary: Borrow a book
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the user borrowing the book
 *       - in: path
 *         name: bookId
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the book being borrowed
 *     responses:
 *       204:
 *         description: Book borrowed successfully
 *       400:
 *         description: Bad request, e.g., book already borrowed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Book already borrowed"
 *       404:
 *         description: User or book not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "User or book not found"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Unexpected error occurred"
 */
/**
 * @swagger
 * /users/{userId}/return/{borrowId}:
 *   post:
 *     summary: Return a borrowed book
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the user returning the book
 *       - in: path
 *         name: borrowId
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the borrow record
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               score:
 *                 type: number
 *                 example: 8.5
 *     responses:
 *       204:
 *         description: Book returned successfully
 *       404:
 *         description: Borrow record not found
 *       400:
 *         description: Invalid return data
 */
//# sourceMappingURL=library.js.map