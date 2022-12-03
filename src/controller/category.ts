import Koa, { Context } from "koa";
import { success } from "../common/ResResult";
import { get } from "../Decorator/methodDecorator";
import categoryServer from "../service/category";
import prefix from "../Decorator/prefixDecorator";
import use from "../Decorator/useDecorator";
import { test1, test2 } from "../middleware/category";
import { verfyAuth } from "../middleware/user";
@prefix("/ctgy")
class CategoryController {
  @get("/all/:firstCtgyId")
  async getCtgyInfo(ctx: Context) {
    const { firstCtgyId } = ctx.params;
    const result = await categoryServer.getCategoryInfoByFirstCtgyId(
      parseInt(firstCtgyId)
    );
    ctx.body = success(result);
  }
  @get("/first")
  async getFirstCtgy(ctx: Context) {
    const result = await categoryServer.getFirstCtgy();
    ctx.body = success(result);
  }
  @get("/second/:secondId")
  async getSecondCtgy(ctx: Context) {
    const { secondId } = ctx.params;
    const result = await categoryServer.getSecondCtgy(secondId);
    ctx.body = success(result);
  }
  @get("/third/:thirdId")
  async getThirdCtgy(ctx: Context) {
    const { thirdId } = ctx.params;
    const result = await categoryServer.getThirdCtgyByThirdId(thirdId);
    ctx.body = success(result);
  }
}
export default new CategoryController();
