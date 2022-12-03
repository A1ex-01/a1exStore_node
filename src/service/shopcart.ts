import shopCart from "../model/shopcart";

interface IShopCart {
  bookisbn: string;
  bookname: string;
  bookpicname: string;
  bookprice: number;
  userid: number;
  purcahrsenum: number;
}

class ShopCartServer {
  async getShopCartByUserId(userId: number) {
    const result = await shopCart.findAll({ where: { userid: userId } });
    return result;
  }
  async addBookToShopCart(shopCart_: IShopCart) {
    const result = await shopCart.create({ ...shopCart_ });
    return result;
  }
  async updateBookToShopCart(
    shopcartId: number,
    purcharsenum: number,
    userid: number
  ) {
    if (purcharsenum === 0) {
      return await shopCart.destroy({
        where: { userid, shopcartid: shopcartId },
      });
    } else {
      return await shopCart.update(
        { purcharsenum, userid },
        { where: { shopcartid: shopcartId } }
      );
    }
  }
}
export default new ShopCartServer();
export { IShopCart };
