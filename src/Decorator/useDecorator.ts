import { Middleware } from "koa";

function use(middleware: Middleware) {
  return function (target: any, key: string) {
    // 先获取中间件
    let mw: Middleware[] = Reflect.getMetadata("middleware", target, key);
    if (!mw) {
      // 没有中间件
      mw = [middleware];
    } else {
      mw.push(middleware);
    }
    // 定义中间件
    Reflect.defineMetadata("middleware", mw, target, key);
  };
}

export default use;
