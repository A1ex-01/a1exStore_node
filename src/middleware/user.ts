import { Context, Next } from "koa";
import jwt from "jsonwebtoken";
class UserMiddleware {
  async verfyAuth(ctx: Context, next: Next) {
    const token = ctx.request.headers.authorization?.slice(7)!;
    const result: any = jwt.verify(token, "a1ex");
    // 将授权id赋予给ctx.user
    if (result) {
      ctx.user = result.userinfo;
    }
    await next();
  }
}

export const { verfyAuth } = new UserMiddleware();
