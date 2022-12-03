import sequelize from "../sequelize/sequelize";
import { DataTypes } from "sequelize";
class OrderDetail {
  static createModel() {
    return sequelize.define(
      "orderdetail",
      {
        orderdetailid: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        bookname: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        bookprice: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        bookpicname: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        orderid: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        purcharsenum: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
      },
      { tableName: "orderdetail", timestamps: false }
    );
  }
}
const orderDetail = OrderDetail.createModel();
export default orderDetail;
