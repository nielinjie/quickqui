import l from "lodash";
import assert from "assert";

declare global {
  interface Object {
    q_applyTo<O, T>(this: O, fun: (obj: O) => T): T;
    q_doWith<O>(this: O, fun: (obj: O) => unknown): O;
  }
  // interface Boolean {
  //   applyTo;
  //   doWith;
  // }
}
function inject(obj: any, name: string, fun: any) {
  if (obj[name] !== undefined) {
    //TODO 有可能被load两次，所以需要这个判断，当util包在不同的node_modules路径下时。
  } else {
    Object.defineProperty(obj, name, { value: fun, enumerable: false });
  }
}

inject(Object.prototype, "q_applyTo", function <
  O,
  T
>(this: NonNullable<O>, fun: (obj: NonNullable<O>) => T): T {
  assert(l.isFunction(fun), "fun is not function");
  return fun(this);
});

inject(Object.prototype, "q_doWith", function <
  O
>(this: NonNullable<O>, fun: (obj: NonNullable<O>) => unknown): O {
  assert(l.isFunction(fun), "fun is not function");
  fun(this);
  return this;
});

export {};
