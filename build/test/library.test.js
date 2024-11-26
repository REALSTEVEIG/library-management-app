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
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../app"));
const service = __importStar(require("../service/library"));
jest.mock("../service/library");
describe("Controller Tests", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
    it("should list users", async () => {
        const mockUsers = [
            { id: 1, name: "John Doe" },
            { id: 2, name: "Jane Doe" },
        ];
        service.listUsers.mockResolvedValue(mockUsers);
        const response = await (0, supertest_1.default)(app_1.default).get("/users");
        expect(service.listUsers).toHaveBeenCalled();
        expect(response.status).toBe(200);
        expect(response.body).toEqual(mockUsers);
    });
    it("should get user by ID", async () => {
        const mockUser = {
            id: 1,
            name: "John Doe",
            books: { past: [], present: [] },
        };
        service.getUser.mockResolvedValue(mockUser);
        const response = await (0, supertest_1.default)(app_1.default).get("/users/1");
        expect(service.getUser).toHaveBeenCalledWith(1);
        expect(response.status).toBe(200);
        expect(response.body).toEqual(mockUser);
    });
    it("should create a user", async () => {
        const mockUser = { id: 1, name: "John Doe" };
        service.createUser.mockResolvedValue(mockUser);
        const response = await (0, supertest_1.default)(app_1.default)
            .post("/users")
            .send({ name: "John Doe" });
        expect(service.createUser).toHaveBeenCalledWith("John Doe");
        expect(response.status).toBe(201);
        expect(response.body).toEqual(mockUser);
    });
    it("should create a book", async () => {
        const mockBook = { id: 1, name: "1984" };
        service.createBook.mockResolvedValue(mockBook);
        const response = await (0, supertest_1.default)(app_1.default)
            .post("/books")
            .send({ name: "1984" });
        expect(service.createBook).toHaveBeenCalledWith("1984");
        expect(response.status).toBe(201);
        expect(response.body).toEqual(mockBook);
    });
    it("should borrow a book", async () => {
        service.borrowBook.mockResolvedValue(undefined);
        const response = await (0, supertest_1.default)(app_1.default).post("/users/1/borrow/2");
        expect(service.borrowBook).toHaveBeenCalledWith(1, 2);
        expect(response.status).toBe(204);
    });
    it("should return a book", async () => {
        service.returnBook.mockResolvedValue(undefined);
        const response = await (0, supertest_1.default)(app_1.default)
            .post("/users/1/return/1")
            .send({ score: 5 });
        expect(service.returnBook).toHaveBeenCalledWith(1, 5);
        expect(response.status).toBe(204);
    });
    it("should get a book by ID", async () => {
        const mockBook = { id: 1, name: "1984", score: "4.50" };
        service.getBook.mockResolvedValue(mockBook);
        const response = await (0, supertest_1.default)(app_1.default).get("/books/1");
        expect(service.getBook).toHaveBeenCalledWith(1);
        expect(response.status).toBe(200);
        expect(response.body).toEqual(mockBook);
    });
    it("should list books", async () => {
        const mockBooks = [
            { id: 1, name: "1984" },
            { id: 2, name: "Brave New World" },
        ];
        service.listBooks.mockResolvedValue(mockBooks);
        const response = await (0, supertest_1.default)(app_1.default).get("/books");
        expect(service.listBooks).toHaveBeenCalled();
        expect(response.status).toBe(200);
        expect(response.body).toEqual(mockBooks);
    });
    it("should handle borrow error for already borrowed book", async () => {
        service.borrowBook.mockRejectedValue(new Error("This book is already borrowed by another user."));
        const response = await (0, supertest_1.default)(app_1.default).post("/users/1/borrow/2");
        expect(service.borrowBook).toHaveBeenCalledWith(1, 2);
        expect(response.status).toBe(400);
        expect(response.body).toEqual({ error: "This book is already borrowed by another user." });
    });
    it("should handle user not found", async () => {
        service.getUser.mockRejectedValue(new Error("User not found"));
        const response = await (0, supertest_1.default)(app_1.default).get("/users/999");
        expect(service.getUser).toHaveBeenCalledWith(999);
        expect(response.status).toBe(404);
        expect(response.body).toEqual({ error: "User not found" });
    });
});
//# sourceMappingURL=library.test.js.map