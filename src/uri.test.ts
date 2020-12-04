import { parse } from "./URI";

test("no host", () => {
  const uri = parse("info:select/changed");
  expect(uri.scheme).toEqual("info");
  expect(uri.host).toBeUndefined();
  expect(uri.path).toEqual(["select", "changed"]);
});
test("no host 2", () => {
  const uri = parse("info:/select/changed");
  expect(uri.scheme).toEqual("info");
  expect(uri.host).toBeUndefined();
  expect(uri.path).toEqual(["", "select", "changed"]);
});
test("with host", () => {
  const uri = parse("info://select/changed");
  expect(uri.scheme).toEqual("info");
  expect(uri.host).toEqual("select");
  expect(uri.path).toEqual(["", "changed"]);
});
