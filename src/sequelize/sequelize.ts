import { Dialect } from "sequelize";
import { Sequelize } from "sequelize-typescript";
import config from "../config/DBConfig";
import path from "path";
class DaoDefine {
  sequelize!: Sequelize;
  constructor() {
    this.initSeqConfig("mysql");
  }
  initSeqConfig(dialect: Dialect) {
    let { host, user, password, database, port } = config.getConfig();
    this.sequelize = new Sequelize(database, user, password, {
      host,
      port,
      dialect,
      pool: {
        min: 50,
        max: 200,
        idle: 10000,
        acquire: 20000,
      },
    });
  }
}
const { sequelize } = new DaoDefine();
export default sequelize;
