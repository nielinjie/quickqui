import jexl from "jexl";
import _ from "lodash";
import { JexlPlus, jexlEvaluator } from "./evaluateJexl";
import { evaluateInObject } from "./evaluate";

let je = new jexl.Jexl();
beforeEach(() => {
  je = new jexl.Jexl();
});

test("simple evaluate", async () => {
  expect.hasAssertions();
  const re = await je.eval("1");
  expect(re).toEqual(1);
});

test("more evaluate", async () => {
  expect.hasAssertions();
  const context = { a: 1 };
  const re = await je.eval("a", context);
  expect(re).toEqual(1);
});

test("more evaluate with function", async () => {
  expect.hasAssertions();
  const context = { a: 1 };
  je.addFunction("let", (name, value) => _({}).set(name, value).value());
  const re = await je.eval(`let('b',2)`, context);
  expect(re).toEqual({ b: 2 });
});
test("mutable evaluate", async () => {
  expect.hasAssertions();
  const context = { a: 1 };
  const jp = new JexlPlus(je, context);
  const [re, newContext] = await jp.eval(`let('b',2)`);
  expect(re).toEqual(2);
  expect(newContext).toEqual({ a: 1, b: 2 });
  const [re2, newContext2] = await jp.eval(`b`);
  expect(re2).toEqual(2);
  expect(newContext2).toEqual({ a: 1, b: 2 });
});
test("mutable evaluate with deep", async () => {
  expect.hasAssertions();
  const context = { a: { c: 1 } };
  const jp = new JexlPlus(je, context);
  const [re, newContext] = await jp.eval(`let('a.d',3)`);
  expect(re).toEqual(3);
  expect(newContext).toEqual({ a: { c: 1, d: 3 } });
  const [re2, newContext2] = await jp.eval(`a.d`);
  expect(re2).toEqual(3);
  expect(newContext2).toEqual({ a: { c: 1, d: 3 } });
});

test("multi line evaluate", async () => {
  expect.hasAssertions();
  const context = { a: 1 };
  const jp = new JexlPlus(je, context);
  const [re, newContext] = await jp.evalLines([`let('b',2)`, `b`]);
  expect(re).toEqual(2);
  expect(newContext).toEqual({ a: 1, b: 2 });
});
