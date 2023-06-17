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
          validate: {
            len: [3, 12],
          },
        },
        nickname: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            len: [3, 12],
          },
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
          validate: {
            len: [9, 11],
          },
        },
      },
      { tableName: "userinfo", timestamps: false }
    );
  }
}
const userInfo = UserInfo.createModel();
export default userInfo;
