import { User, Book, Borrow } from "../models/association";

export const listUsers = async () => await User.findAll();

export const getUser = async (id: number) => {
  const user = await User.findByPk(id, {
    include: [
      {
        model: Borrow,
        include: [Book],
        required: false,
      },
    ],
  });

  if (!user) throw new Error("User not found");

  const past = user.Borrows?.filter((borrow: any) => borrow.returned).map((borrow: any) => ({
    name: borrow.Book?.name,
    userScore: borrow.score,
  })) || [];

  const present = user.Borrows?.filter((borrow: any) => !borrow.returned).map((borrow: any) => ({
    name: borrow.Book?.name,
  })) || [];

  return {
    id: user.id,
    name: user.name,
    books: {
      past,
      present,
    },
  };
};


export const createUser = async (name: string) => await User.create({ name });

export const listBooks = async () => await Book.findAll();

export const getBook = async (id: number) => {
  const book = await Book.findByPk(id);
  if (!book) throw new Error("Book not found");
  return {
    id: book.id,
    name: book.name,
    score: book.ratingCount > 0 ? (book.score / book.ratingCount).toFixed(2) : -1,
  };
};

export const createBook = async (name: string) => await Book.create({ name });

export const borrowBook = async (userId: number, bookId: number) => {
    const existingBorrow = await Borrow.findOne({
      where: { bookId, returned: false },
    });
  
    if (existingBorrow) {
      throw new Error("This book is already borrowed by another user.");
    }
  
    return await Borrow.create({ userId, bookId });
  };
  
export const returnBook = async (borrowId: number, score: number) => {
  const borrow = await Borrow.findByPk(borrowId);
  if (!borrow) throw new Error("Borrow record not found");

  const book = await Book.findByPk(borrow.bookId);
  if (!book) throw new Error("Book not found");

  book.ratingCount++;
  book.score += score;
  await book.save();

  borrow.returned = true;
  borrow.score = score;
  await borrow.save();
};
