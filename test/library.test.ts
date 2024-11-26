import { createUser, createBook, borrowBook } from "../service/library";
import User from "../models/user";
import Book from "../models/book";
import Borrow from "../models/borrow";

jest.mock("../models/User");
jest.mock("../models/Book");
jest.mock("../models/Borrow");

describe("Library Service", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should create a user", async () => {
    const mockUser = { id: 1, name: "John Doe" };
    (User.create as jest.Mock).mockResolvedValue(mockUser);

    const result = await createUser("John Doe");
    expect(User.create).toHaveBeenCalledWith({ name: "John Doe" });
    expect(result).toEqual(mockUser);
  });

  it("should create a book", async () => {
    const mockBook = { id: 1, name: "1984" };
    (Book.create as jest.Mock).mockResolvedValue(mockBook);

    const result = await createBook("1984");
    expect(Book.create).toHaveBeenCalledWith({ name: "1984" });
    expect(result).toEqual(mockBook);
  });

  it("should create a borrow record", async () => {
    const mockBorrow = { id: 1, userId: 1, bookId: 1, returned: false };
    (Borrow.create as jest.Mock).mockResolvedValue(mockBorrow);

    const result = await borrowBook(1, 1);
    expect(Borrow.create).toHaveBeenCalledWith({ userId: 1, bookId: 1 });
    expect(result).toEqual(mockBorrow);
  });
});
