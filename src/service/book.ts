import { Op } from "sequelize";
import book from "../model/books";

class BookServer {
  async findBooksByThirdCtgyId(id: number, sortBy: string, ascOrdesc: string) {
    // const order: any = [["", ""]];
    // if (!sortBy) {
    //   return await book.findAll({
    //     where: { thirdctgyid: id },
    //   });
    // }
    // if (sortBy) {
    //   order.push([sortBy, ascOrdesc]);
    // }
    return await book.findAll({
      order: [[sortBy, ascOrdesc]],
      where: { thirdctgyid: id },
    });
  }
  async findBooksByKeyword(keyword: string) {
    return await book.findAll({
      where: {
        [Op.or]: [
          {
            bookname: {
              [Op.like]: `%${keyword}%`,
            },
          },
          {
            author: {
              [Op.like]: `%${keyword}%`,
            },
          },
        ],
      },
    });
  }
  async getBookByISBN(ISBN: string) {
    return await book.findOne({ where: { ISBN } });
  }
  async findAllBook(offset: number, limit: number) {
    return await book.findAndCountAll({ offset, limit });
  }
}
export default new BookServer();
