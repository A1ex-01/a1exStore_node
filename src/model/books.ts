import { DataTypes } from "sequelize";
import sequelize from "../sequelize/sequelize";

class Book {
  static createModel() {
    return sequelize.define(
      "books",
      {
        ISBN: {
          type: DataTypes.STRING,
          primaryKey: true,
        },
        bookname: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        author: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        publishid: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        publishername: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        monthsalecount: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        bookpicname: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        secondctgyid: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        thirdctgyid: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        originalprice: {
          type: DataTypes.FLOAT,
          allowNull: false,
        },
        discount: {
          type: DataTypes.FLOAT,
          allowNull: false,
        },
        star: {
          type: DataTypes.FLOAT,
          allowNull: false,
        },
        desc: {
          type: DataTypes.FLOAT,
          allowNull: false,
        },
      },
      { tableName: "books", timestamps: false }
    );
  }
}
const book = Book.createModel();
export default book;
