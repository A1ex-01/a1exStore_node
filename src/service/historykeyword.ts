import { Op } from "sequelize";
import historyKeyWord from "../model/historykeyword";
import sequelize from "../sequelize/sequelize";

class KeyWordServer {
  async getSearchList() {
    const result = await historyKeyWord.findAll({
      order: [["clickcount", "desc"]],
      limit: 10,
    });
    return result;
  }
  async getSearchListByHistoryKeyWord(historykeyword: string) {
    return await historyKeyWord.findOne({ where: { historykeyword } });
  }
  async saveHistoryKeyWord(historykeyword: string) {
    return await historyKeyWord.create({ historykeyword, clickcount: 1 });
  }
  async updateHistoryWordCount(historykeyword: string) {
    return await historyKeyWord.update(
      { clickcount: sequelize.literal("clickcount + 1") },
      { where: { historykeyword } }
    );
  }
  async addOrUpdateHistoryKeyword(historykeyword: string) {
    const db = await this.getSearchListByHistoryKeyWord(historykeyword);
    if (db) {
      return await this.updateHistoryWordCount(historykeyword);
    } else {
      return await this.saveHistoryKeyWord(historykeyword);
    }
  }
}
export default new KeyWordServer();
