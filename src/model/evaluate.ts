import { DataTypes } from "sequelize";
import sequelize from "../sequelize/sequelize";
import reply from "./reply";

class Evaluate {
  static createModel() {
    return sequelize.define(
      "evaluate",
      {
        evaluateid: {
          type: DataTypes.INTEGER,
          primaryKey: true,
        },
        content: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        evaluator: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        isbn: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        givealikenum: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        evaluatedegree: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        pubdate: {
          type: DataTypes.TIME,
        },
      },
      { tableName: "evaluate", timestamps: false }
    );
  }
}

const evaluate = Evaluate.createModel(); // 建立关系
evaluate.hasMany(reply, { as: "replys", foreignKey: "evalid" });
reply.belongsTo(evaluate, { foreignKey: "evalid", targetKey: "evaluateid" });
export default evaluate;
