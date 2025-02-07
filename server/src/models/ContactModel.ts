import { DataTypes, Model } from "sequelize";
// Import Sequelize from the database.

class Contact extends Model {
  public id!: number;
  public firstName!: string;
  public lastName!: string;
  public category!: string;
  public email!: string;
  public phone!: string;
  public comments!: string;
}

Contact.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    category: {
      type: DataTypes.ENUM("Service Request", "Interest in a Car", "Appraisal", "General Inquiry"),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { isEmail: true },
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
    modelName: "Contact",
    timestamps: true, // Adds createdAt and updatedAt fields
  }
);

export default Contact;