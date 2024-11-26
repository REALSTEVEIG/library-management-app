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
 *     responses:
 *       201:
 *         description: User created successfully
 */
//# sourceMappingURL=library.js.map