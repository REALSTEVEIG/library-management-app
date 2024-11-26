import request from "supertest";
import app from "../app";
import * as service from "../service/library";

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
    (service.listUsers as jest.Mock).mockResolvedValue(mockUsers);

    const response = await request(app).get("/users");
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
    (service.getUser as jest.Mock).mockResolvedValue(mockUser);

    const response = await request(app).get("/users/1");
    expect(service.getUser).toHaveBeenCalledWith(1);
    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockUser);
  });

  it("should create a user", async () => {
    const mockUser = { id: 1, name: "John Doe" };
    (service.createUser as jest.Mock).mockResolvedValue(mockUser);

    const response = await request(app)
      .post("/users")
      .send({ name: "John Doe" });
    expect(service.createUser).toHaveBeenCalledWith("John Doe");
    expect(response.status).toBe(201);
    expect(response.body).toEqual(mockUser);
  });

  it("should create a book", async () => {
    const mockBook = { id: 1, name: "1984" };
    (service.createBook as jest.Mock).mockResolvedValue(mockBook);

    const response = await request(app)
      .post("/books")
      .send({ name: "1984" });
    expect(service.createBook).toHaveBeenCalledWith("1984");
    expect(response.status).toBe(201);
    expect(response.body).toEqual(mockBook);
  });

  it("should borrow a book", async () => {
    (service.borrowBook as jest.Mock).mockResolvedValue(undefined);

    const response = await request(app).post("/users/1/borrow/2");
    expect(service.borrowBook).toHaveBeenCalledWith(1, 2);
    expect(response.status).toBe(204);
  });

  it("should return a book", async () => {
    (service.returnBook as jest.Mock).mockResolvedValue(undefined);

    const response = await request(app)
      .post("/users/1/return/1")
      .send({ score: 5 });
    expect(service.returnBook).toHaveBeenCalledWith(1, 5);
    expect(response.status).toBe(204);
  });

  it("should get a book by ID", async () => {
    const mockBook = { id: 1, name: "1984", score: "4.50" };
    (service.getBook as jest.Mock).mockResolvedValue(mockBook);

    const response = await request(app).get("/books/1");
    expect(service.getBook).toHaveBeenCalledWith(1);
    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockBook);
  });

  it("should list books", async () => {
    const mockBooks = [
      { id: 1, name: "1984" },
      { id: 2, name: "Brave New World" },
    ];
    (service.listBooks as jest.Mock).mockResolvedValue(mockBooks);

    const response = await request(app).get("/books");
    expect(service.listBooks).toHaveBeenCalled();
    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockBooks);
  });

  it("should handle borrow error for already borrowed book", async () => {
    (service.borrowBook as jest.Mock).mockRejectedValue(
      new Error("This book is already borrowed by another user.")
    );

    const response = await request(app).post("/users/1/borrow/2");
    expect(service.borrowBook).toHaveBeenCalledWith(1, 2);
    expect(response.status).toBe(400);
    expect(response.body).toEqual({ error: "This book is already borrowed by another user." });
  });

  it("should handle user not found", async () => {
    (service.getUser as jest.Mock).mockRejectedValue(new Error("User not found"));

    const response = await request(app).get("/users/999");
    expect(service.getUser).toHaveBeenCalledWith(999);
    expect(response.status).toBe(404);
    expect(response.body).toEqual({ error: "User not found" });
  });
});
