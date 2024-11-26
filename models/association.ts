import User from "./user";
import Book from "./book";
import Borrow from "./borrow";

User.hasMany(Borrow, { foreignKey: "userId" });
Borrow.belongsTo(User, { foreignKey: "userId" });

Book.hasMany(Borrow, { foreignKey: "bookId" });
Borrow.belongsTo(Book, { foreignKey: "bookId" });

export { User, Book, Borrow };
