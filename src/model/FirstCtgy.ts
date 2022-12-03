import { DataTypes } from "sequelize";
import sequelize from "../sequelize/sequelize";
import thirdCtgy from "./thirdCtgy";

class FirstCtgy {
  static createModel() {
    return sequelize.define(
      "firstctgy",
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
      { tableName: "firstctgy", timestamps: false }
    );
  }
}

const firstCtgy = FirstCtgy.createModel();

export default firstCtgy;
