import { filterObject, deepMerge } from "./util";

test("deep merge", () => {
  const ob = { a: 1, b: 2, c: undefined };
  const re = filterObject(ob);
  expect(Object.keys(ob)).toEqual(["a", "b", "c"]);
  expect(Object.keys(re)).toEqual(["a", "b"]);
  expect(ob).toEqual(re);
  const newOb = { a: 2, b: 3, c: 4 };
  const merged = deepMerge(newOb, ob);
  expect(merged).toEqual({ a: 1, b: 2, c: undefined });
  const merged2 = deepMerge(newOb, re);
  expect(merged2).toEqual({ a: 1, b: 2, c: 4 });
});
test("deep merge deep", () => {
  const ob = { a: 1, b: 2, c: { d: 3, e: undefined } };
  const re = filterObject(ob);
  expect(ob).toEqual({ a: 1, b: 2, c: { d: 3, e: undefined } });
  expect(re).toEqual({ a: 1, b: 2, c: { d: 3 } });
  expect(Object.keys(ob.c)).toEqual(["d", "e"]);
  expect(Object.keys(re.c)).toEqual(["d"]);
  const newOb = { a: 2, b: 3, c: { d: 7, e: 6 } };
  const merged = deepMerge(newOb, ob);
  expect(merged).toEqual({ a: 1, b: 2, c: { d: 3, e: undefined } });
  const merged2 = deepMerge(newOb, re);
  expect(merged2).toEqual({ a: 1, b: 2, c: { d: 3, e: 6 } });
});
