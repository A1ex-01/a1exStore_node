import sequelize from "../sequelize/sequelize";
import { DataTypes } from "sequelize";
class ShopCart {
  static createModel() {
    return sequelize.define(
      "shopcart",
      {
        shopcartid: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        bookisbn: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        bookname: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        bookpicname: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        bookprice: {
          type: DataTypes.DECIMAL,
          allowNull: false,
        },
        userid: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        purcharsenum: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
      },
      { tableName: "shopcart", timestamps: false }
    );
  }
}
const shopCart = ShopCart.createModel();
export default shopCart;
