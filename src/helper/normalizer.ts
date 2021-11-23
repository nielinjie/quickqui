import { Model, NormalizeLog } from "@quick-qui/model-core";
import {
  chain,
  Log as ShorthandLog,
  Rule,
} from "@nielinjie/shorthand";
import yaml from 'js-yaml'
export type NormalizeResult = [any, NormalizeLog[]];
export type NormalizeFun = (model: Model, piece: any) => NormalizeResult;
export function normalizeByRules(model: Model, piece: any,rules:Rule[]): NormalizeResult {
  // const [re, logs] = withDebug(chain(...rules)).run(piece);
  const [re, logs] = chain(...rules).run(piece);
  return [re, shortLogToNorLog(logs)];
}
function shortLogToNorLog(logs: ShorthandLog[]): NormalizeLog[] {
  return logs.map((log) => {
    return new NormalizeLog(log.path, log.message, log.level);
  });
}
export function pipe(a: NormalizeFun, b: NormalizeFun): NormalizeFun {
  return (model: Model, piece: any) => {
    const [pe, logs] = a(model, piece);
    const [bpe, blogs] = b(model, pe);
    return [bpe, [...logs, ...blogs]];
  };
}
export function withDebug(rule:Rule){
  rule.setDebug(dump)
  return rule
}
function dump(re) {
  console.log(yaml.dump(re[0]));
  // console.log(re[1]);
}