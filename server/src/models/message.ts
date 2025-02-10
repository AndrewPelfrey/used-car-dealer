import { Model, DataTypes } from "sequelize";
import sequelize from "../config/connections.js"; 

class Message extends Model {
  public id!: number;
  public category!: string;
  public firstName!: string;
  public lastName!: string;
  public email!: string;
  public phone!: string;
  public comments!: string;
  public createdAt!: Date;
  public updatedAt!: Date;
}

Message.init(
  {
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    comments: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "messages",
  }
);

export default Message;
