import _ from 'lodash'
import './extensions'
test("injected", () => {
  const ob = {};
  const re = ob.applyTo(_.constant(1));
  expect(re).toEqual(1);
});
test("injected", () => {
  const ob = {};
  const re = ob.doWith(_.constant(1));
  expect(re).toEqual(ob);
});
