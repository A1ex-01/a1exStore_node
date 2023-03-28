import sequelize from "../sequelize/sequelize";
import { DataTypes } from "sequelize";
class UserInfo {
  static createModel() {
    return sequelize.define(
      "userinfo",
      {
        userid: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        username: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        nickname: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        psw: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        address: {
          type: DataTypes.STRING,
        },
        valid: {
          type: DataTypes.INTEGER,
        },
        phone: {
          type: DataTypes.STRING,
        },
      },
      { tableName: "userinfo", timestamps: false }
    );
  }
}
const userInfo = UserInfo.createModel();
export default userInfo;
