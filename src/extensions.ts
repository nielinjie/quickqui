import l from "lodash";
import assert from "assert";

declare global {
  interface Object {
    applyTo<O, T>(this: O, fun: (obj: O) => T): T;
    doWith<O>(this: O, fun: (obj: O) => unknown): O;
  }
  // interface Boolean {
  //   applyTo;
  //   doWith;
  // }
}
function inject(obj: any, name: string, fun: any) {
  Object.defineProperty(obj, name, { value: fun, enumerable: false });
}

inject(Object.prototype, "applyTo", function <
  O,
  T
>(this: NonNullable<O>, fun: (obj: NonNullable<O>) => T): T {
  assert(l.isFunction(fun), "fun is not function");
  return fun(this);
});

inject(Object.prototype, "doWith", function <
  O
>(this: NonNullable<O>, fun: (obj: NonNullable<O>) => unknown): O {
  assert(l.isFunction(fun), "fun is not function");
  fun(this);
  return this;
});

export {};
