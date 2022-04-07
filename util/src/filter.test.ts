import { filterObject } from ".";

test("filterObject", () => {
  const ob = { a: 1, b: 2, c: undefined };
  const re = filterObject(ob);
  expect(Object.keys(ob)).toEqual(["a", "b", "c"]);
  expect(Object.keys(re)).toEqual(["a", "b"]);
  expect(ob).toEqual(re);
  const newOb = { a: 2, b: 3, c: 4 };
  //this is why we filter.
  const merged = { ...newOb, ...ob };
  expect(merged).toEqual({ a: 1, b: 2, c: undefined });
  const merged2 = { ...newOb, ...re };
  expect(merged2).toEqual({ a: 1, b: 2, c: 4 });
});
test("filterObject deep", () => {
  const ob = { a: 1, b: 2, c: { d: 3, e: undefined } };
  const re = filterObject(ob);
  expect(ob).toEqual({ a: 1, b: 2, c: { d: 3, e: undefined } });
  expect(re).toEqual({ a: 1, b: 2, c: { d: 3 } });
  expect(re).toEqual(ob);
  expect(Object.keys(ob.c)).toEqual(["d", "e"]);
  expect(Object.keys(re.c)).toEqual(["d"]);
});
test("filterObject array", () => {
  const ob = [1, 2, undefined, 4, 5];
  const re = filterObject(ob);
  expect(re).toEqual([1, 2, 4, 5]);
});
