import { Context } from "koa";
import { success } from "../common/ResResult";
import { get, post } from "../Decorator/methodDecorator";
import prefix from "../Decorator/prefixDecorator";
import use from "../Decorator/useDecorator";
import { verfyAuth } from "../middleware/user";
import merchantServer from "../service/merchant";
import userInfoServer from "../service/userinfo";
@prefix("/merchant")
class MerchantController {
  // @use(verfyAuth)
  @get("/:id")
  async getMechantInfo(ctx: Context) {
    const { id } = ctx.params;
    const result = await merchantServer.findOne(id);
    ctx.body = success(result, result ? "" : "商家不存在~");
  }
  @post("/")
  async login(ctx: Context) {
    const { merchant_email, merchant_psw } = ctx.request.body;
    const result = await merchantServer.find(merchant_email, merchant_psw);
    ctx.body = success(result, result ? "" : "商家不存在获密码错误~");
  }
}
