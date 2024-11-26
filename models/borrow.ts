import { DataTypes, Model } from "sequelize";
import sequelize from "../config/config";
import User from "./user";
import Book from "./book";

interface BorrowAttributes {
  id?: number;
  userId: number;
  bookId: number;
  returned?: boolean;
  score?: number;
}

class Borrow extends Model<BorrowAttributes> implements BorrowAttributes {
  id!: number;
  userId!: number;
  bookId!: number;
  returned!: boolean;
  score?: number;
}

Borrow.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
    },
    bookId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Book,
        key: "id",
      },
    },
    returned: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    score: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: "borrows",
    timestamps: false,
  }
);

Borrow.belongsTo(User, { foreignKey: "userId" });
Borrow.belongsTo(Book, { foreignKey: "bookId" });

export default Borrow;
