import { DataTypes, Model } from "sequelize";
import sequelize from "../config/config";

interface UserAttributes {
  id?: number;
  name: string;
}

class User extends Model<UserAttributes> implements UserAttributes {
  id!: number;
  name!: string;
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

