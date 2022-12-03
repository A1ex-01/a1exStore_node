import routerLoader from "./common/autoRouterLoader";
import app from "./config/app";
import rootRouter from "./config/rootRouter";
// import "./controller/category";
// const app = new Koa();
// app.use(json());
// app.use(body());

// const router = new Router();
// router.prefix("/dang");

// 全局错误中间件
// app.use(globalExec);

// 传递root路由,导入二级路由
// routerLoader.getRootRouter(rootRouter);
routerLoader.init();
// import "../src/controller/category";
// import "../src/controller/user";
// 挂载路由\
app.use(rootRouter.routes());
app.listen(3002);
