import mergeOptions from "merge-options";
import logger from "debug-logger";
import _ from "lodash";
import FP from 'lodash/fp'
export function notNil<TValue>(
  value: TValue | null | undefined
): value is TValue {
  return value !== null && value !== undefined;
}
export async function replaceInObject(
  obj: any,
  find: RegExp,
  replace: (matchResult: RegExpExecArray) => Promise<any>
): Promise<object> {
  const ret: any = {};
  if (Array.isArray(obj)) {
    let re: object[] = [];
    for (let i of obj) {
      re = [...re, await replaceInObject(i, find, replace)];
    }
    return re;
  }

  if (typeof obj !== "object") {
    if (typeof obj === "string" && find.test(obj))
      return await replaceOneByOne(obj, find, replace);
    else {
      return Promise.resolve(obj);
    }
  }

  for (let key of Object.keys(obj)) {
    if (obj[key] && typeof obj[key] === "object") {
      ret[key] = await replaceInObject(obj[key], find, replace);
    } else if (
      obj[key] &&
      typeof obj[key] === "string" &&
      find.test(obj[key])
    ) {
      //TODO 只处理了单个value里面匹配一次的情况。
      // ret[key] = replace(find.exec(obj[key])!);
      ret[key] = await replaceOneByOne(obj[key], find, replace);
    } else {
      ret[key] = obj[key];
    }
  }
  return Promise.resolve(ret);
}
export async function replaceOneByOne(
  str: string,
  find: RegExp,
  replaceFun: (matchResult: RegExpExecArray) => Promise<any>
) {
  if (find.test(str)) {
    const matchString = find.exec(str)![0];
    if (matchString === str) {
      return await replaceFun(find.exec(str)!);
    }
  } else {
    return str;
  }
  let re = str;
  while (find.test(re)) {
    re = re.replace(find, await replaceFun(find.exec(re)!));
  }
  return re;
}
export function filterObject(obj: any) {
  if (Array.isArray(obj)) {
    return obj.filter(notNil).map((a) => {
      return filterObject(a);
    });
  }
  if (typeof obj !== "object") return obj;
  const ret: any = {};
  Object.keys(obj)
    .filter((key) => obj[key] !== undefined)
    .forEach((key) => {
      const value = obj[key];
      if (typeof obj[key] === "object") {
        ret[key] = filterObject(value);
      } else {
        ret[key] = value;
      }
    });
  return ret;
}

export function findIn(obj: any, fun) {
  const fla = flattenKeys(obj);
  return _.pickBy(fla, (value, key) => fun(value));
}


export function deepMerge(obj: any, source: any): any {
  return mergeOptions.call({ concatArrays: true }, obj, source);
}
export function logging(name: string) {
  return logger(name);
}

export const flattenKeys = (obj, path: string[] = []) =>
  !_.isObject(obj)
    ? { [path.join(".")]: obj }
    : _.reduce(
        obj,
        (cum, next, key) => _.merge(cum, flattenKeys(next, [...path, key])),
        {}
      );
export const unflattenKeys = FP.flow([
  FP.toPairs,
  FP.reduce((cum, [key, value]) => _.set(cum, key, value), {}),
]);