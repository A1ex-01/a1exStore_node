import jwt from "jsonwebtoken";
import userinfo from "../model/UserInfo";
interface IUser {
  username: string;
  psw: string;
  token?: string;
}
class UserInfoServer {
  async findOne(user: IUser) {
    let result: any = await userinfo.findOne({ where: { ...user }, raw: true });
    if (result) {
      return this.createJWTToken(result);
    } else {
      return result;
    }
  }
  createJWTToken(userinfo: IUser) {
    const token = jwt.sign({ userinfo: { ...userinfo, psw: "xxx" } }, "a1ex", {
      expiresIn: "2h",
      header: { alg: "HS256", typ: "JWT" },
    });
    userinfo.token = token;
    return userinfo;
  }
  async getUserInfo(userid: number) {
    return await userinfo.findOne({ where: { userid } });
  }
  async editUserInfo(userid: string, user: any) {
    return await userinfo.update({ ...user }, { where: { userid } });
  }
}

export default new UserInfoServer();
