import { DataTypes, Model } from "sequelize";
import sequelize from "../config/config";
import Borrow from "./borrow";

interface BookAttributes {
  id?: number;
  name: string;
  score?: number;
  ratingCount?: number;
}

class Book extends Model<BookAttributes> implements BookAttributes {
  id!: number;
  name!: string;
  score!: number;
  ratingCount!: number;
}

Book.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    score: {
      type: DataTypes.FLOAT,
      defaultValue: 0,
    },
    ratingCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  },
  {
    sequelize,
    tableName: "books",
    timestamps: false,
  }
);

export default Book;
