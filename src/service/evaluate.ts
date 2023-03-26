import evaluate from "../model/evaluate";
import reply from "../model/reply";

class EvaluateServer {
  async getEvaluateReplyList(isbn: string) {
    return await evaluate.findAll({
      order: [["pubdate", "desc"]],
      where: { isbn },
      include: [{ model: reply, as: "replys" }],
    });
  }
  async addEvaluateBook(
    ISBN: string,
    content: string,
    evaluator: string,
    userid: number,
    evaluatedegree: number
  ) {
    return await evaluate.create({
      isbn: ISBN,
      content,
      evaluator,
      evaluatedegree,
      givealikenum: 0,
    });
  }
  async applyInfo(evalid: number, replycontent: string, replyor: string) {
    return await reply.create({ evalid, replycontent, replyor });
  }
}

export default new EvaluateServer();
