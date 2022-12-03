import sequelize from "../sequelize/sequelize";
import { DataTypes } from "sequelize";
class HistroyKeyWord {
  static createModel() {
    return sequelize.define(
      "historykeyword",
      {
        historykeywordid: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        historykeyword: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        clickcount: {
          type: DataTypes.INTEGER,
        },
      },
      { tableName: "historykeyword", timestamps: false }
    );
  }
}
const historyKeyWord = HistroyKeyWord.createModel();
export default historyKeyWord;
