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
    userid: number
  ) {
    return await evaluate.create({
      isbn: ISBN,
      content,
      evaluator,
      givealikenum: 0,
      evaluatedegree: Math.ceil(Math.random() * 3),
    });
  }
  async applyInfo(evalid: number, replycontent: string, replyor: string) {
    return await reply.create({ evalid, replycontent, replyor });
  }
}

export default new EvaluateServer();
