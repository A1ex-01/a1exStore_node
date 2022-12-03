import { DataTypes } from "sequelize";
import sequelize from "../sequelize/sequelize";

class Reply {
  static createModel() {
    return sequelize.define(
      "reply",
      {
        replyid: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        replycontent: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        replydate: {
          type: DataTypes.TIME,
        },
        evalid: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        replyor: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
      },
      { tableName: "reply", timestamps: false }
    );
  }
}
const reply = Reply.createModel();
export default reply;
