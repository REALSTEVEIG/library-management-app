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