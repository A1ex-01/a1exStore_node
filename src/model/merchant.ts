import sequelize from "../sequelize/sequelize";
import { DataTypes } from "sequelize";
class Merchant {
  static createModel() {
    return sequelize.define(
      "merchant",
      {
        merchant_id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
        },
        merchant_name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        merchant_address: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        merchant_contact: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        merchant_phone: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        merchant_email: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        business_license: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        business_scope: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        registration_time: {
          type: DataTypes.TIME,
          allowNull: false,
        },
        status: {
          type: DataTypes.STRING,
          allowNull: false,
        },
      },
      { tableName: "merchant", timestamps: false }
    );
  }
}
const merchant = Merchant.createModel();
export default merchant;
