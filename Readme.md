# Library Management System

## Overview
I developed a **Library Management System** as part of a backend case study. This project meets the requirements for managing library users and books, including borrowing and returning functionality. The project uses modern technologies like **Node.js**, **Express.js**, **TypeScript**, and **PostgreSQL** with Sequelize ORM.

---

## Features

### User Management
- List all users
- Get details of a specific user (past and current borrowed books)
- Create a new user

### Book Management
- List all books
- Get details of a specific book (name, average rating)
- Create a new book

### Borrowing and Returning Books
- Borrow a book
- Return a book with a user rating

### Error Handling
- Prevent borrowing of non-existent books or by non-existent users
- Handle attempts to borrow already-borrowed books

### Validation
- Input validation using `express-validator`

### Documentation
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
   git clone https://github.com/REALSTEVEIG/library-management-app


2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables:
   Create a `.env` file:
   ```bash
   PGHOST=xxxx
   PGUSER=xxxx
   PGPORT=xxx
   PGDATABASE=xxx
   PGPASSWORD=xxxx
   ```

4. Run build:
   ```bash
   npm run build
   ```

5. Start the server:
   ```bash
   npm start
   ```

6. Access Swagger documentation at `http://localhost:3000/api-docs`.

7. Live version is also available at `https://inventanalytics-e6cucchdfwb3chb8.canadacentral-01.azurewebsites.net/api-docs/`

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

## Enhancements
1. **Detailed Swagger Documentation**: API is fully documented with request/response examples.
2. **Improved Error Handling**: Explicit error responses for invalid requests.
3. **TypeScript Integration**: Ensures type safety and maintainability.

---

## Contact
If you have questions or feedback, feel free to reach out at stephenignatiusbiz@gmail.com.
```