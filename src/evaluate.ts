import { replaceInObject } from "./util";
import _ from "lodash";

export const DOUBLE_BIG_BRACKET = /\$\{\{(.*)\}\}/;

export function simpleGetEvaluator(
  context: object,
  matchResult: RegExpExecArray
): Promise<[any, object]> {
  return Promise.resolve([context[matchResult[1]], context]);
}
export function lodashGetEvaluator(
  context: object,
  matchResult: RegExpExecArray
): Promise<[any, object]> {
  return Promise.resolve([_(context).get(matchResult[1]), context]);
}
export async function evaluateInObject(
  obj: any,
  context: object,
  evaluate: (
    context: object,
    matchResult: RegExpExecArray
  ) => Promise<[any, object]>,
  bracket: RegExp = /\$\{(.*)\}/
): Promise<[object, object]> {
  let con = context;
  return [
    await replaceInObject(obj, bracket, async (result) => {
      const re = await evaluate(con, result);
      con = re[1];
      return re[0];
    }),
    con,
  ];
}
