"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const library_1 = require("../service/library");
const user_1 = __importDefault(require("../models/user"));
const book_1 = __importDefault(require("../models/book"));
const borrow_1 = __importDefault(require("../models/borrow"));
jest.mock("../models/User");
jest.mock("../models/Book");
jest.mock("../models/Borrow");
describe("Library Service", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
    it("should create a user", async () => {
        const mockUser = { id: 1, name: "John Doe" };
        user_1.default.create.mockResolvedValue(mockUser);
        const result = await (0, library_1.createUser)("John Doe");
        expect(user_1.default.create).toHaveBeenCalledWith({ name: "John Doe" });
        expect(result).toEqual(mockUser);
    });
    it("should create a book", async () => {
        const mockBook = { id: 1, name: "1984" };
        book_1.default.create.mockResolvedValue(mockBook);
        const result = await (0, library_1.createBook)("1984");
        expect(book_1.default.create).toHaveBeenCalledWith({ name: "1984" });
        expect(result).toEqual(mockBook);
    });
    it("should create a borrow record", async () => {
        const mockBorrow = { id: 1, userId: 1, bookId: 1, returned: false };
        borrow_1.default.create.mockResolvedValue(mockBorrow);
        const result = await (0, library_1.borrowBook)(1, 1);
        expect(borrow_1.default.create).toHaveBeenCalledWith({ userId: 1, bookId: 1 });
        expect(result).toEqual(mockBorrow);
    });
});
//# sourceMappingURL=library.js.map