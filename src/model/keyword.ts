import sequelize from "../sequelize/sequelize";
import { DataTypes } from "sequelize";
class KeyWord {
  static createModel() {
    return sequelize.define(
      "keyword",
      {
        keywordid: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        keyword: {
          type: DataTypes.STRING,
          allowNull: false,
        },
      },
      { tableName: "keyword", timestamps: false }
    );
  }
}
const keyWord = KeyWord.createModel();
export default keyWord;
