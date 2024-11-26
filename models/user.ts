import { DataTypes, Model } from "sequelize";
import sequelize from "../config/config";
import Borrow from "./borrow";

interface UserAttributes {
  id?: number;
  name: string;
}

class User extends Model<UserAttributes> implements UserAttributes {
  id!: number;
  name!: string;
  Borrows: any;
}

User.init(
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
  },
  {
    sequelize,
    tableName: "users",
    timestamps: false,
  }
);

export default User;
