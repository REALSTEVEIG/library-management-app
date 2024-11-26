### Adding Swagger Documentation

#### Step 1: Install Swagger Dependencies
First, install the necessary Swagger dependencies:
```bash
npm install swagger-ui-express swagger-jsdoc
```

---

#### Step 2: Create Swagger Configuration (`swaggerConfig.ts`)
Create a file `config/swaggerConfig.ts` to define the Swagger setup.

```typescript
import swaggerJSDoc from "swagger-jsdoc";

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Library Management API",
      version: "1.0.0",
      description: "API for managing library members and book borrowing/returning",
    },
    servers: [
      {
        url: "http://localhost:3000/api",
        description: "Local server",
      },
    ],
  },
  apis: ["./routes/*.ts"], // Specify where API documentation is defined
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);
export default swaggerDocs;
```

---

#### Step 3: Add API Documentation to Routes (`routes/libraryRoutes.ts`)
Use Swagger comments to document endpoints.

```typescript
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

// Add similar documentation for other routes
```

---

#### Step 4: Integrate Swagger into `server.ts`
Update your `server.ts` file to serve the Swagger documentation.

```typescript
import swaggerUi from "swagger-ui-express";
import swaggerDocs from "./config/swaggerConfig";

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

console.log("Swagger documentation available at /api-docs");
```

---

### GitHub README

```markdown
# Library Management System

## Overview
I developed a **Library Management System** as part of a backend case study. This project meets the requirements for managing library users and books, including borrowing and returning functionality. The project uses modern technologies like **Node.js**, **Express.js**, **TypeScript**, and **PostgreSQL** with Sequelize ORM.

---

## Features
1. **User Management**:
   - List all users
   - Get details of a specific user (past and current borrowed books)
   - Create a new user

2. **Book Management**:
   - List all books
   - Get details of a specific book (name, average rating)
   - Create a new book

3. **Borrowing and Returning Books**:
   - Borrow a book
   - Return a book with a user rating

4. **Error Handling**:
   - Prevent borrowing of non-existent books or by non-existent users
   - Handle attempts to borrow already-borrowed books

5. **Validation**:
   - Input validation using `express-validator`

6. **Documentation**:
   - Comprehensive API documentation using Swagger, available at `/api-docs`.

---

## Technology Stack
- **Backend**: Node.js, Express.js
- **Language**: TypeScript
- **Database**: PostgreSQL
- **ORM**: Sequelize
- **Validation**: express-validator
- **API Documentation**: Swagger

---

## Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/library-management.git
   cd library-management
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables:
   Create a `.env` file:
   ```
   PGHOST=xxxx
   PGUSER=xxxx
   PGPORT=xxx
   PGDATABASE=xxx
   PGPASSWORD=xxxx
   ```

4. Run database migrations:
   ```bash
   npm run build
   ```

5. Start the server:
   ```bash
   npm start
   ```

6. Access Swagger documentation at `http://localhost:3000/api-docs`.

---

## API Endpoints

### Users
- **GET /users**: List all users
- **POST /users**: Create a new user

### Books
- **GET /books**: List all books
- **POST /books**: Create a new book

### Borrowing and Returning
- **POST /users/:userId/borrow/:bookId**: Borrow a book
- **POST /users/:userId/return/:borrowId**: Return a book and give a rating

---

## Testing
I wrote unit tests using Jest. Run tests with:
```bash
npm test
```

---

## Enhancements
1. **Detailed Swagger Documentation**: API is fully documented with request/response examples.
2. **Improved Error Handling**: Explicit error responses for invalid requests.
3. **TypeScript Integration**: Ensures type safety and maintainability.

---

## Contact
If you have questions or feedback, feel free to reach out at stephenignatiusbiz@gmail.com.
```

---