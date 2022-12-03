import { Context } from "koa";
import prefix from "../Decorator/prefixDecorator";
import { get, post } from "../Decorator/methodDecorator";
import bookServer from "../service/book";
import { success } from "../common/ResResult";
import evaluateServer from "../service/evaluate";
import use from "../Decorator/useDecorator";
import { verfyAuth } from "../middleware/user";
@prefix("/evaluate")
class EvaluateController {
  @get("/:ISBN")
  async findAllEvaluateByISBN(ctx: Context) {
    const { ISBN } = ctx.params;
    const result = await evaluateServer.getEvaluateReplyList(ISBN);
    ctx.body = success(result);
  }
  @use(verfyAuth)
  @post("/:ISBN")
  async addEvaluateBook(ctx: Context) {
    const { ISBN } = ctx.params;
    const { content, evaluator } = ctx.request.body;
    const result = await evaluateServer.addEvaluateBook(
      ISBN,
      content,
      evaluator,
      ctx.user.userid
    );
    ctx.body = success(result);
  }
  @use(verfyAuth)
  @post("/reply/:evaluateid")
  async applyInfo(ctx: Context) {
    const { evaluateid } = ctx.params;
    const { content, replyor } = ctx.request.body;
    const result = await evaluateServer.applyInfo(evaluateid, content, replyor);
    ctx.body = success(result);
  }
}
