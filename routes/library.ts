import express from "express";
import { body, param } from "express-validator";
import * as controller from "../controller/library";

const router = express.Router();

// User routes
router.get("/users", controller.listUsersController);
router.get("/users/:id", [param("id").isInt()], controller.getUserController);
router.post("/users", [body("name").notEmpty()], controller.createUserController);

// Book routes
router.get("/books", controller.listBooksController);
router.get("/books/:id", [param("id").isInt()], controller.getBookController);
router.post("/books", [body("name").notEmpty()], controller.createBookController);

// Borrow/Return routes
router.post(
  "/users/:userId/borrow/:bookId",
  [param("userId").isInt(), param("bookId").isInt()],
  controller.borrowBookController
);
router.post(
  "/users/:userId/return/:borrowId",
  [param("borrowId").isInt(), body("score").isFloat({ min: 0, max: 10 })],
  controller.returnBookController
);

export default router;

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

