export function notNil<TValue>(
  value: TValue | null | undefined
): value is TValue {
  return value !== null && value !== undefined;
}
export function replaceInObject(
  obj: any,
  find: RegExp,
  replace: (matchResult: string[]) => any
) {
  const ret: any = {};
  Object.keys(obj).forEach((key) => {
    if (obj[key] && typeof obj[key] === "string" && find.test(obj[key])) {
      ret[key] = replace(find.exec(obj[key]) ?? []);
    } else {
      ret[key] = obj[key];
    }
  });
  return ret;
}
export function filterObject(obj: any) {
  const ret: any = {};
  Object.keys(obj)
    .filter((key) => obj[key] !== undefined)
    .forEach((key) => (ret[key] = obj[key]));
  return ret;
}