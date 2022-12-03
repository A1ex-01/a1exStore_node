import path from "path";
import fs from "fs";
import Router from "koa-router";
class AutoRouterLoader {
  rootRouter!: Router;
  init() {
    this.getAbsoluteFilePaths();
  }
  // 加载所有文件数组
  getFiles(dir: string) {
    return fs.readdirSync(dir);
  }
  getRootRouter(rootRouter: Router) {
    // 保存根路由
    this.rootRouter = rootRouter;
  }
  getAbsoluteFilePaths() {
    // 获取控制器下的所有文件
    const dir = path.join(process.cwd(), "/src/controller");
    const allFiles = this.getFiles(dir);
    // 获取绝对路径
    const allFullFilePaths: string[] = [];
    for (let file of allFiles) {
      const fullFilePath = dir + "\\" + file;
      allFullFilePaths.push(fullFilePath);
    }
    // 将所有路由加到根路由中
    this.loadAllRouterWarpper(allFullFilePaths);
  }
  isRouter(data: any): data is Router {
    return data instanceof Router;
  }
  loadAllRouterWarpper(allFullFilePaths: string[]) {
    for (let fullFilePath of allFullFilePaths) {
      // 直接导入路径
      require(fullFilePath);
      // if (this.isRouter(module)) {
      //   this.rootRouter.use(module.routes(), module.allowedMethods());
      // }
    }
  }
}
const routerLoader = new AutoRouterLoader();
export default routerLoader;
