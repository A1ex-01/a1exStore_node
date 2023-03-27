import { Context } from "koa";
import { fail, success } from "../common/ResResult";
import { post } from "../Decorator/methodDecorator";
import prefix from "../Decorator/prefixDecorator";
import use from "../Decorator/useDecorator";
import { verfyAuth } from "../middleware/user";
import orderInfoServer from "../service/orderinfo";
@prefix("/orderinfo")
class OrderInfoController {
  @use(verfyAuth)
  @post("/")
  async addOrderInfo(ctx: Context) {
    const customerid = ctx.user.userid;
    const { orderDetailList } = ctx.request.body;
    if (!orderDetailList.length) {
      ctx.body = fail("书本不能为空");
      return;
    }
    const result = await orderInfoServer.addOrderInfo(
      orderDetailList,
      customerid
    );
    // 删除购物车
    ctx.body = success(result);
  }
  @use(verfyAuth)
  @post("/all")
  async getAllOrderInfo(ctx: Context) {
    const { offset, limit } = ctx.request.body;
    const result = await orderInfoServer.getAllOrderInfo(
      offset,
      limit,
      ctx.user.userid
    );
    ctx.body = success(result);
  }
  @use(verfyAuth)
  @post("/:order_id")
  async getOrderInfoById(ctx: Context) {
    const { order_id } = ctx.params;
    const result = await orderInfoServer.getOrderInfoById(
      order_id,
      ctx.user.userid
    );
    ctx.body = success(result);
  }
}
