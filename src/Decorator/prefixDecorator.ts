import Router from "koa-router";
import type { IRequestType } from "./type";
import rootRouter from "../config/rootRouter";
import { Middleware } from "koa";
function prefix(prefix: string) {
  return function (target: new (...args: any[]) => any) {
    const router = new Router({ prefix });

    // 遍历类中所有的方法 => defineMeta时保存的key
    for (let fn in target.prototype) {
      // 获取路径和方法
      const path = Reflect.getMetadata("path", target.prototype, fn);
      const type: IRequestType = Reflect.getMetadata(
        "type",
        target.prototype,
        fn
      );
      const middlewareArr: Middleware[] = Reflect.getMetadata(
        "middleware",
        target.prototype,
        fn
      );
      if (middlewareArr) {
        router[type](path, ...middlewareArr, target.prototype[fn]);
      } else {
        router[type](path, target.prototype[fn]);
      }
      // router上添加路由
    }
    // 载入rootRouter
    rootRouter.use(router.routes(), router.allowedMethods());
  };
}

export default prefix;
