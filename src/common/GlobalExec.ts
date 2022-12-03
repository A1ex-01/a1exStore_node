import Koa, { Context } from "koa";
import { authorFail, fail } from "./ResResult";

const globalExec = async (ctx: Context, next: Koa.Next) => {
  try {
    await next();
  } catch (err: any) {
    switch (err.name) {
      case "JsonWebTokenError":
        ctx.body = authorFail("token不合法~");
        break;
      case "TokenExpiredError":
        ctx.body = authorFail("token已过期~");
        break;
      default:
        ctx.body = `服务器错误:${err.message}`;
    }
  }
};

export default globalExec;
