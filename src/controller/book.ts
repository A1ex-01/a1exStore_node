import { Context } from "koa";
import prefix from "../Decorator/prefixDecorator";
import { get, post } from "../Decorator/methodDecorator";
import bookServer from "../service/book";
import { success } from "../common/ResResult";
@prefix("/book")
class BookController {
  @get("/all")
  async findAllBook(ctx: Context) {
    const { offset = 0, limit = 6 } = ctx.request.query;
    const books = await bookServer.findAllBook(+offset, +limit);
    ctx.body = success(books);
  }
  @get("/:thirdCtgyId")
  async findBooksByThirdCtgyId(ctx: Context) {
    const { thirdCtgyId } = ctx.params;
    const { sortBy = "ISBN", ascOrdesc = "desc" } = ctx.query;
    const books = await bookServer.findBooksByThirdCtgyId(
      parseInt(thirdCtgyId),
      sortBy as string,
      ascOrdesc as string
    );
    ctx.body = success(books);
  }
  @post("/keyword")
  async findBooksByKeyword(ctx: Context) {
    const { keyword } = ctx.request.body;
    const books = await bookServer.findBooksByKeyword(keyword);
    ctx.body = success(books);
  }
  @post("/:ISBN")
  async getBookByISBN(ctx: Context) {
    const { ISBN } = ctx.params;
    const book = await bookServer.getBookByISBN(ISBN);
    ctx.body = success(book);
  }
}
