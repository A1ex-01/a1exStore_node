import sequelize from "../sequelize/sequelize";
import { DataTypes } from "sequelize";
import orderDetail from "./orderdetail";
import moment from "moment";
class OrderInfo {
  static createModel() {
    return sequelize.define(
      "orderinfo",
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        ordertime: {
          type: DataTypes.TIME,
          get() {
            return moment(this.getDataValue("ordertime"))
              .utcOffset(0)
              .format("YYYY-MM-DD HH:mm:ss");
          },
        },
        customerid: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        orderstatus: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
      },
      { tableName: "orderinfo", timestamps: false }
    );
  }
}
const orderInfo = OrderInfo.createModel();
// 建立关系
orderInfo.hasMany(orderDetail, { as: "orderdetails", foreignKey: "orderid" });
orderDetail.belongsTo(orderInfo, {
  foreignKey: "orderid",
  targetKey: "id",
});
export default orderInfo;
