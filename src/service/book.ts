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
  async findBooksByKeyword(keyword: string, offset: number) {
    return await book.findAndCountAll({
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
      offset,
      limit: 6,
    });
  }
  async getBookByISBN(ISBN: string) {
    return await book.findOne({ where: { ISBN } });
  }
  async findAllBook(offset: number, limit: number) {
    return await book.findAndCountAll({ offset, limit });
  }
  async addBook({
    ISBN,
    bookname,
    author,
    publishername,
    bookpicname,
    secondctgyid,
    thirdctgyid,
    originalprice,
    desc,
  }: {
    ISBN: string;
    bookname: string;
    author: string;
    publishername: string;
    bookpicname: string;
    secondctgyid: string;
    thirdctgyid: string;
    originalprice: string;
    desc: string;
  }) {
    const discount = +(Math.random() * 0.5).toFixed(2) + 0.5;
    const star = +(Math.random() * 0.5).toFixed(2) + 0.5;
    return await book.create({
      ISBN,
      bookname,
      author,
      publishid: 10,
      publishername,
      monthsalecount: 100,
      bookpicname,
      secondctgyid,
      thirdctgyid,
      originalprice,
      discount,
      star,
      desc,
    });
    // return {
    //   ISBN,
    //   bookname,
    //   author,
    //   publishid: 10,
    //   publishername,
    //   monthsalecount: 100,
    //   bookpicname,
    //   secondctgyid,
    //   thirdctgyid,
    //   originalprice,
    //   discount,
    //   star,
    //   desc,
    // };
  }
}
export default new BookServer();
