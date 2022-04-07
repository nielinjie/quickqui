import { findIn } from "./util";
import _ from "lodash";

test("find in", () => {
  const ob = { a: 1, b: { c: 1, d: 2 } };
  const found = findIn(ob, (value: number) => value === 1);
  expect(found).toEqual({ a: 1, "b.c": 1 });
  expect(_.values(found)).toEqual([1,1])
});
