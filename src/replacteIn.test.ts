import { replaceInObject } from "./util";
import _ from "lodash";

test("keep array no touch", () => {
  const a = [
    { id: 1, name: 1 },
    { id: 2, name: 1 },
  ];
  const re = replaceInObject(a, /\$\{(.*)\}/, _.constant(1));
  expect(re).toEqual(a);
});

test("keep array no touch 2", () => {
  const a = {
    b: [
      { id: 1, name: 1 },
      { id: 2, name: 1 },
    ],
  };
  const re = replaceInObject(a, /\$\{(.*)\}/, _.constant(1));
  expect(re).toEqual(a);
});
