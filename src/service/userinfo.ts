import jwt from "jsonwebtoken";
import userinfo from "../model/UserInfo";
import { Context } from "koa";
import { fail } from "../common/ResResult";
import { createHash } from "crypto";
export const SECRET_KEY = "a1ex_";
export function md5(content: any) {
  let md5 = createHash("md5");
  return md5.update(content).digest("hex"); // 把输出编程16进制的格式
}
export function genPassword(password: string) {
  const str = `password=${password}&key=${SECRET_KEY}`; // 拼接方式是自定的，只要包含密匙即可
  return md5(str);
}
interface IUser {
  username: string;
  psw: string;
  token?: string;
}
interface IRegisterUser extends IUser {
  phone: string;
}
class UserInfoServer {
  async findOne(user: IUser) {
    user.psw = genPassword(user.psw);
    let result: any = await userinfo.findOne({ where: { ...user }, raw: true });
    if (result) {
      delete result.psw;
      return this.createJWTToken(result);
    } else {
      return result;
    }
  }
  async register(user: IRegisterUser, ctx: Context) {
    const result = await userinfo.findOne({
      where: { username: user.username },
      raw: true,
    });
    if (result) {
      return (ctx.body = fail("用户名已存在~"));
    } else {
      const userRes = await userinfo.create({
        nickname: user.username,
        username: user.username,
        psw: genPassword(user.psw),
        phone: user.phone,
        valid: 1,
      });
      return userRes;
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
