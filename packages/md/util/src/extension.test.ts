import _ from 'lodash'
import './extensions'
test("injected", () => {
  const ob = {};
  const re = ob.q_applyTo(_.constant(1));
  expect(re).toEqual(1);
});
test("injected", () => {
  const ob = {};
  const re = ob.q_doWith(_.constant(1));
  expect(re).toEqual(ob);
});
test("injected string", () => {
  const ob :string = 'ob';
  const re = ob.q_applyTo(_.constant(1));
  expect(re).toEqual(1);
});
test("injected number", () => {
  const ob: number = 4;
  const re = ob.q_applyTo(_.constant(1));
  expect(re).toEqual(1);
});