import { replaceInObject, replaceOneByOne } from "./util";
import _ from "lodash";

const valueReg = /\$\{(.*?)\}/;
const constant = () => Promise.resolve(1);
test("keep array no touch", async () => {
  expect.hasAssertions();
  const a = [
    { id: 1, name: 1 },
    { id: 2, name: 1 },
  ];
  const re = await replaceInObject(a, valueReg, constant);
  expect(re).toEqual(a);
});
// it("other", () => {
test("keep array no touch 2", async () => {
  expect.hasAssertions();

  const a = {
    b: [
      { id: 1, name: 1 },
      { id: 2, name: 1 },
    ],
  };
  const re = await replaceInObject(a, valueReg, constant);
  expect(re).toEqual(a);
});
test("array replace", async () => {
  expect.hasAssertions();
  const a = {
    b: ["${value}", "${value}"],
    c: "${value}",
  };
  const re = await replaceInObject(a, valueReg, constant);
  expect(re).toEqual({
    b: [1, 1],
    c: 1,
  });
});

test("simple replace", async () => {
  expect.hasAssertions();
  const a = {
    b: [
      { id: 1, name: 1 },
      { id: 2, name: "${value}" },
    ],
  };
  const re = await replaceInObject(a, valueReg, constant);
  expect(re).toEqual({
    b: [
      { id: 1, name: 1 },
      { id: 2, name: 1 },
    ],
  });
});
test("multi replace", async () => {
  expect.hasAssertions();

  const a = {
    b: [
      { id: 1, name: 1 },
      { id: 2, name: "${value}" },
    ],
    c: "${value}",
  };
  const re = await replaceInObject(a, valueReg, constant);
  expect(re).toEqual({
    b: [
      { id: 1, name: 1 },
      { id: 2, name: 1 },
    ],
    c: 1,
  });
});
test("multi in one value replace", async () => {
  expect.hasAssertions();

  const a = {
    b: [
      { id: 1, name: 1 },
      { id: 2, name: "${value}${value}" },
      { id: 2, name: "${value} ${value}" },
      { id: 2, name: "${value}n${value}" },
    ],
  };
  const re = await replaceInObject(a, /\$\{(.*?)\}/, constant);
  expect(re).toEqual({
    b: [
      { id: 1, name: 1 },
      { id: 2, name: "11" },
      { id: 2, name: "1 1" },
      { id: 2, name: "1n1" },
    ],
  });
});
test("related multi replace", async () => {
  expect.hasAssertions();
  let counter = 0;
  const a = {
    b: [
      { id: 1, name: 1 },
      { id: 2, name: "${value}" },
    ],
    c: "${value}",
  };
  const re = await replaceInObject(a, valueReg, async () => {
    counter = counter + 1;
    return counter;
  });
  expect(re).toEqual({
    b: [
      { id: 1, name: 1 },
      { id: 2, name: 1 },
    ],
    c: 2,
  });
});

test("replace one by one ", async () => {
  expect.hasAssertions();
  let counter = 0;
  const a = "${value} ${x}, ${b}";
  const re = await replaceOneByOne(a, valueReg, async () => {
    counter = counter + 1;
    return counter;
  });
  expect(re).toEqual("1 2, 3");
});
// });
