import { Context } from "koa";
import { authorFail, success } from "../common/ResResult";
import { get, post } from "../Decorator/methodDecorator";
import prefix from "../Decorator/prefixDecorator";
import use from "../Decorator/useDecorator";
import { verfyAuth } from "../middleware/user";
import shopCartServer, { IShopCart } from "../service/shopcart";
import AlipayFormData from "alipay-sdk/lib/form";
import alipaySdk from "../model/aliPay";
import axios from "axios";
import { fail } from "assert";
import moment from "moment";
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
  @use(verfyAuth)
  @post("/alipay/pay")
  async alipay(ctx: Context) {
    const { order_id, return_url, total_amount, subject } = ctx.request.body;
    const alipayFormData = new AlipayFormData();
    let data: any = {
      out_trade_no: order_id,
      product_code: "FAST_INSTANT_TRADE_PAY",
      total_amount,
      subject,
    };
    data = JSON.stringify(data);
    alipayFormData.setMethod("get");
    alipayFormData.addField("return_url", return_url);
    alipayFormData.addField("biz_content", data);
    const result = await alipaySdk.exec(
      "alipay.trade.page.pay",
      {},
      {
        formData: alipayFormData,
      }
    );
    ctx.body = success(result);
  }
  @use(verfyAuth)
  @post("/alipay/status")
  async queryPayStatus(ctx: Context) {
    const { out_trade_no, trade_no } = ctx.request.body;
    const alipayFormData = new AlipayFormData();
    let data: any = { out_trade_no, trade_no };
    data = JSON.stringify(data);
    alipayFormData.setMethod("get");
    alipayFormData.addField("biz_content", data);
    const result: any = await alipaySdk.exec(
      "alipay.trade.query",
      {},
      {
        formData: alipayFormData,
      }
    );
    const res = await axios.get(result);
    const r = res.data.alipay_trade_query_response;
    console.log(r);
    if (r.code === "10000") {
      if (r.trade_status === "TRADE_SUCCESS") {
        ctx.body = success("交易成功");
      } else {
        ctx.body = fail("交易失败");
      }
    } else {
      ctx.body = fail("交易不存在");
    }
  }
}
