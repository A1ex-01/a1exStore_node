import firstCtgy from "../model/FirstCtgy";
import secondCtgy from "../model/SecondCtgy";
import thirdCtgy from "../model/thirdCtgy";

class CategoryServer {
  async getCategoryInfoByFirstCtgyId(id: number) {
    return await secondCtgy.findAll({
      where: { firstCtgyId: id },
      include: [{ model: thirdCtgy, as: "thirdctgys" }],
    });
  }
  async getFirstCtgy() {
    return await firstCtgy.findAll();
  }
  async getThirdCtgyByThirdId(thirdId: number) {
    return await thirdCtgy.findAll({ where: { id: thirdId } });
  }
  async getSecondCtgy(secondId: number) {
    return await secondCtgy.findOne({ where: { id: secondId } });
  }
}
export default new CategoryServer();
