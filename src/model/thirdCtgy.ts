import { DataTypes } from "sequelize";
import sequelize from "../sequelize/sequelize";

class ThirdCtgy {
  static createModel() {
    return sequelize.define(
      "thirdctgy",
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
        secCtgyId: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
      },
      { tableName: "thirdctgy", timestamps: false }
    );
  }
}
const thirdCtgy = ThirdCtgy.createModel();
export default thirdCtgy;
