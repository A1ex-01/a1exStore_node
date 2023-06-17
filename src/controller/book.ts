import { Context } from "koa";
import prefix from "../Decorator/prefixDecorator";
import { get, post } from "../Decorator/methodDecorator";
import bookServer from "../service/book";
import { fail, success } from "../common/ResResult";
import use from "../Decorator/useDecorator";
import { verfyAuth } from "../middleware/user";
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
    const { keyword, offset = 0 } = ctx.request.body;
    const books = await bookServer.findBooksByKeyword(keyword, offset);
    ctx.body = success(books);
  }
  @post("/:ISBN")
  async getBookByISBN(ctx: Context) {
    const { ISBN } = ctx.params;
    const book = await bookServer.getBookByISBN(ISBN);
    ctx.body = success(book);
  }
  @use(verfyAuth)
  @post("/add/:ISBN")
  async addBook(ctx: Context) {
    if (!ctx.user) {
      ctx.body = fail("您还未登录或没有该权限");
      return;
    }
    const { ISBN } = ctx.params;
    const {
      bookname,
      author,
      publishername,
      bookpicname,
      secondctgyid,
      thirdctgyid,
      originalprice,
      desc,
    } = ctx.request.body;
    const book = await bookServer.addBook({
      ISBN,
      bookname,
      author,
      publishername,
      bookpicname,
      secondctgyid,
      thirdctgyid,
      originalprice,
      desc,
    });
    ctx.body = success(book);
  }
}
