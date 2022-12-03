import { Context } from "koa";
import prefix from "../Decorator/prefixDecorator";
import { get, post } from "../Decorator/methodDecorator";
import { success } from "../common/ResResult";
import historyKeyWordServer from "../service/historykeyword";
@prefix("/historykeyword")
class HistoryKeyWordController {
  // 通过输入的关键字查询搜索列表
  @get("/")
  async getSearchList(ctx: Context) {
    const result = await historyKeyWordServer.getSearchList();
    ctx.body = success(result);
  }
  @post("/save")
  async saveHistoryKeyWord(ctx: Context) {
    const { historykeyword } = ctx.request.body;
    const result = await historyKeyWordServer.addOrUpdateHistoryKeyword(
      historykeyword
    );
    ctx.body = success(result);
  }
}
