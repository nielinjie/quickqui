import _ from "lodash";
import { flattenKeys } from "./util";

test("keys", () => {
  const obj = { a: 1, b: { f: [{ c: 2 }, { d: 3 }, { e: 4 }] } };
  const re = flattenKeys(obj);
  expect(_(re).keys().value()).toEqual(["a", "b.f.0.c", "b.f.1.d", "b.f.2.e"]);
  expect(_(re).get('b.f.1.d')).toEqual(3);
  expect(_(obj).get('b.f.1')).toEqual({d:3});
});
