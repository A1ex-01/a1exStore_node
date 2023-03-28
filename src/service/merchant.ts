import jwt from "jsonwebtoken";
import merchant from "../model/merchant";
import userinfo from "../model/UserInfo";
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
}

export default new MerchantServer();
