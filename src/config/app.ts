import Koa from "koa";
import body from "koa-body";
import json from "koa-json";
import globalExec from "../common/GlobalExec";
const app = new Koa();
app.use(json());
app.use(body());
// 全局错误中间件
app.use(globalExec);

export default app;
