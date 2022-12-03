import { Context, Next } from "koa";

const test1 = async (ctx: Context, next: Next) => {
  console.log("test1");
  await next();
};
const test2 = async (ctx: Context, next: Next) => {
  console.log("test2");
  await next();
};
export { test1, test2 };
