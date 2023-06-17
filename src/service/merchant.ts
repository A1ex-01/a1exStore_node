import jwt from "jsonwebtoken";
import merchant from "../model/merchant";
import userinfo from "../model/UserInfo";
import userServer from "../service/userinfo";
import { genPassword } from "./userinfo";
interface IUser {
  username: string;
  psw: string;
  token?: string;
}
class MerchantServer {
  async findOne(id: number) {
    let result: any = await merchant.findOne({
      where: { merchant_id: id },
      raw: true,
    });
    return result;
  }
  async find(email: string, merchant_psw: string) {
    const result = await merchant.findOne({
      attributes: { exclude: ["merchant_psw"] },
      where: { merchant_email: email, merchant_psw: genPassword(merchant_psw) },
      raw: true,
    });
    if (result) {
      userServer.createJWTToken(result as any);
    }
    return result;
  }
}

export default new MerchantServer();
