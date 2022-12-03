import { Context } from "koa";
import { authorFail, success } from "../common/ResResult";
import { get, post } from "../Decorator/methodDecorator";
import prefix from "../Decorator/prefixDecorator";
import use from "../Decorator/useDecorator";
import { verfyAuth } from "../middleware/user";
import shopCartServer, { IShopCart } from "../service/shopcart";
@prefix("/shopcart")
class ShopCartController {
  @use(verfyAuth)
  @get("/:userId")
  async getShopCartByUserId(ctx: Context) {
    const { userId } = ctx.params;
    if (userId !== ctx.user.userid) {
      ctx.body = authorFail("身份验证错误~");
    }
    const result = await shopCartServer.getShopCartByUserId(userId);
    ctx.body = success(result);
  }
  @use(verfyAuth)
  @post("/")
  async addShopCart(ctx: Context) {
    const shopCart: IShopCart = ctx.request.body as IShopCart;
    shopCart.userid = ctx.user.userid;
    const result = await shopCartServer.addBookToShopCart(shopCart);
    ctx.body = success(result);
  }
  @use(verfyAuth)
  @post("/:shopCartId")
  async updateShopCart(ctx: Context) {
    const { shopCartId } = ctx.params;
    const { purcharsenum } = ctx.request.body;
    const result = await shopCartServer.updateBookToShopCart(
      parseInt(shopCartId as string),
      purcharsenum,
      ctx.user.userid
    );
    ctx.body = success(result);
  }
}
