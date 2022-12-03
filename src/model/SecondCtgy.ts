import { DataTypes } from "sequelize";
import sequelize from "../sequelize/sequelize";
import thirdCtgy from "./thirdCtgy";

class SecondCtgy {
  static createModel() {
    return sequelize.define(
      "secondctgy",
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
        firstCtgyId: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
      },
      { tableName: "secondctgy", timestamps: false }
    );
  }
}

const secondCtgy = SecondCtgy.createModel();
// 建立关系
secondCtgy.hasMany(thirdCtgy, { as: "thirdctgys", foreignKey: "secCtgyId" });
thirdCtgy.belongsTo(secondCtgy, { foreignKey: "secCtgyId", targetKey: "id" });
export default secondCtgy;
