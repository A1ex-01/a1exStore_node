import { IRequestType } from "./type";

function getMethodDecorator(type: IRequestType) {
  return function (path: string) {
    return function (target: any, key: string, desc: PropertyDescriptor) {
      // 元信息保存路径名
      Reflect.defineMetadata("path", path, target, key);
      // 元信息保存方法名
      Reflect.defineMetadata("type", type, target, key);
    };
  };
}

const get = getMethodDecorator(IRequestType.GET);
const post = getMethodDecorator(IRequestType.POST);
const del = getMethodDecorator(IRequestType.DEL);
const put = getMethodDecorator(IRequestType.PUT);

export { get, post, del, put };
