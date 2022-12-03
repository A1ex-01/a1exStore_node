import { Context } from "koa";
import { success } from "../common/ResResult";
import { post } from "../Decorator/methodDecorator";
import prefix from "../Decorator/prefixDecorator";
import use from "../Decorator/useDecorator";
import { verfyAuth } from "../middleware/user";
import userInfoServer from "../service/userinfo";
@prefix("/user")
class UserInfoController {
  // @use(verfyAuth)
  @post("/login")
  async login(ctx: Context) {
    const { username, psw } = ctx.request.body;
    const result = await userInfoServer.findOne({ username, psw });
    ctx.body = success(result, result ? "" : "账号不存在或账号密码错误~");
  }
  @use(verfyAuth)
  @post("/")
  async getUserInfo(ctx: Context) {
    const userid = ctx.user.userid;
    const result = await userInfoServer.getUserInfo(userid);
    ctx.body = success(result);
  }
}
