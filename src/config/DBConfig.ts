interface DBConfig {
  host: string;
  user: string;
  password: string;
  port: number;
  database: string;
}
interface EnvConfig {
  dev: DBConfig;
  prod: DBConfig;
}
class Config {
  env!: string;
  envConfig!: EnvConfig;
  constructor() {
    this.env = process.env.NODE_ENV || "prod";
    this.initConfig();
  }
  initConfig() {
    this.envConfig = {
      dev: {
        host: "localhost",
        user: "root",
        password: "Vae20.30Peter",
        database: "ddStore",
        port: 3306,
      },
      prod: {
        host: "www.a1ex.vip",
        user: "root",
        password: "Vae20.30Peter",
        database: "ddstore",
        port: 3306,
      },
    };
  }
  getConfig(): DBConfig {
    return this.envConfig[this.env === "dev" ? "dev" : "prod"];
  }
}
const config = new Config();
export default config;
