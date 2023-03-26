import { Context, Next } from "koa";

const test1 = async (ctx: Context, next: Next) => {
  await next();
};
const test2 = async (ctx: Context, next: Next) => {
  await next();
};
export { test1, test2 };
