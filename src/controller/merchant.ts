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
  async login(ctx: Context) {
    const { id } = ctx.params;
    const result = await merchantServer.findOne(id);
    ctx.body = success(result, result ? "" : "商家不存在~");
  }
}
