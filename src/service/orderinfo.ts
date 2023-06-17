import orderDetail from "../model/orderdetail";
import orderInfo from "../model/orderinfo";
import shopcart from "./shopcart";

interface IOrderList {
  bookname: string;
  bookprice: number;
  bookpicname: string;
  purcharsenum: number;
  shopcartid: number;
}
class OrderInfoServer {
  async addOrderInfo(
    orderDetailList: IOrderList[],
    customerid: number,
    address: string
  ) {
    // 保存订单
    const orderinfo: any = await orderInfo.create({
      customerid,
      orderstatus: 1,
      address,
    });
    const id = orderinfo.id;
    let result;
    for (let order of orderDetailList) {
      // 保存详情
      result = await orderDetail.create({
        bookname: order.bookname,
        bookprice: order.bookprice,
        bookpicname: order.bookpicname,
        orderid: id,
        purcharsenum: order.purcharsenum,
      });
      // 删除购物che
      await shopcart.updateBookToShopCart(order.shopcartid, 0, customerid);
    }
    return result;
  }
  async getAllOrderInfo(offset = 0, limit = 5, customerid: number) {
    const result = await orderInfo.findAndCountAll({
      order: [["ordertime", "desc"]],
      where: { customerid },
      offset,
      limit,
      include: [{ model: orderDetail, as: "orderdetails" }],
    });
    const count = await orderInfo.count({ where: { customerid } });
    result.count = count;
    return result;
  }
  async getOrderInfoById(order_id: string, customerid: number) {
    const result = await orderInfo.findOne({
      where: { customerid, id: order_id },
      include: [{ model: orderDetail, as: "orderdetails" }],
    });
    return result;
  }
}

export default new OrderInfoServer();
