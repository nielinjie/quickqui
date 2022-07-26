import {
  simpleGetEvaluator,
  evaluateInObject,
  lodashGetEvaluator,
} from "./evaluate";
import { jexlEvaluator } from "./evaluateJexl";
import _ from "lodash";
test.each([
  ["simple", simpleGetEvaluator],
  ["lodash", lodashGetEvaluator],
  ["jexl", jexlEvaluator()],
])("%s simple", async (name, evaluator) => {
  expect.hasAssertions();
  const a = {
    b: [
      { id: 1, name: 1 },
      { id: 2, name: "${value}" },
    ],
    c: "${value}",
  };
  const context = { value: "valueString" };
  const re = await evaluateInObject(a, context, evaluator);
  expect(re[0]).toEqual({
    b: [
      { id: 1, name: 1 },
      { id: 2, name: "valueString" },
    ],
    c: "valueString",
  });
  expect(re[1]).toEqual(context);
});
test.each([
  ["simple", simpleGetEvaluator],
  ["lodash", lodashGetEvaluator],
  ["jexl", jexlEvaluator()],
])("%s simple and bracket ", async (name, evaluator) => {
  expect.hasAssertions();
  const a = {
    b: [
      { id: 1, name: 1 },
      { id: 2, name: "${{value}}" },
    ],
    c: "${value}",
  };
  const context = { value: "valueString" };
  const re = await evaluateInObject(a, context, evaluator, /\$\{\{(.*)\}\}/);
  expect(re[0]).toEqual({
    b: [
      { id: 1, name: 1 },
      { id: 2, name: "valueString" },
    ],
    c: "${value}",
  });
  expect(re[1]).toEqual(context);
});

test.each([
  ["simple", simpleGetEvaluator],
  ["lodash", lodashGetEvaluator],
  ["jexl", jexlEvaluator()],
])("%s simple 2 val", async (name, evaluator) => {
  expect.hasAssertions();
  const a = {
    b: [
      { id: 1, name: 1 },
      { id: 2, name: "${value1}" },
    ],
    c: "${value2}",
  };
  const context = { value1: "valueString1", value2: "valueString2" };
  const re = await evaluateInObject(a, context, evaluator);
  expect(re[0]).toEqual({
    b: [
      { id: 1, name: 1 },
      { id: 2, name: "valueString1" },
    ],
    c: "valueString2",
  });
  expect(re[1]).toEqual(context);
});

test.each([
  ["lodash", lodashGetEvaluator],
  ["jexl", jexlEvaluator()],
])("%s dot", async (name, evaluator) => {
  expect.hasAssertions();
  const a = {
    b: [
      { id: 1, name: 1 },
      { id: 2, name: "${value.a}" },
    ],
    c: "${value.b}",
  };
  const context = { value: { a: "A", b: "B" } };
  const re = await evaluateInObject(a, context, evaluator);
  expect(re[0]).toEqual({
    b: [
      { id: 1, name: 1 },
      { id: 2, name: "A" },
    ],
    c: "B",
  });
  expect(re[1]).toEqual(context);
});
test.each([["jexl", jexlEvaluator()]])("%s let", async (name, evaluator) => {
  expect.hasAssertions();
  const a = {
    b: [
      { id: 1, name: 1 },
      { id: 2, name: "${let('b',3)}" },
    ],
    c: "${b+1}",
  };
  const context = { value: "valueString" };
  const re = await evaluateInObject(a, context, evaluator);
  expect(re[0]).toEqual({
    b: [
      { id: 1, name: 1 },
      { id: 2, name: 3 },
    ],
    c: 4,
  });
  expect(re[1]).toEqual({ ...context, b: 3 });
});
test.each([["jexl", jexlEvaluator()]])("%s let", async (name, evaluator) => {
  expect.hasAssertions();
  const a = {
    b: [
      { id: 1, name: 1 },
      { id: 2, name: "${letIfNo('b',3)}" },
    ],
    c: "${b+1}",
  };
  const context = { value: "valueString",b:2 };
  const re = await evaluateInObject(a, context, evaluator);
  expect(re[0]).toEqual({
    b: [
      { id: 1, name: 1 },
      { id: 2, name: 2 },
    ],
    c: 3,
  });
  expect(re[1]).toEqual({ ...context, b: 2 });
});