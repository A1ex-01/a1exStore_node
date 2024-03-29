enum Code {
  SUCCESS = 200,
  ERROR = 500,
  AUTHORFAIL = 401,
}
class ResResult {
  static success(data: any = undefined, msg: any = "") {
    const code: Code = Code.SUCCESS;
    return { data, msg, code };
  }
  static fail(msg: any = "") {
    const code: Code = Code.ERROR;
    return { undefined, msg, code };
  }
  static authorFail(msg: any = "") {
    const code: Code = Code.AUTHORFAIL;
    return { undefined, msg, code };
  }
}
export const { success, fail, authorFail } = ResResult;
