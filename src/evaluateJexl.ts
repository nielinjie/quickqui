import jexl from "jexl";
import { deepMerge } from "./util";
import _ from "lodash";

export function jexlEvaluator(functions: { name: string; fun }[] = []) {
  const evaluator = async (context, result) => {
    const plus = new JexlPlus(undefined, context);
    functions.forEach((fun) => plus.addFunction(fun.name, fun.fun));
    return await plus.eval(result[1]);
  };
  return evaluator;
}
export class JexlPlus {
  constructor(private _jexl: any = new jexl.Jexl(), public context: object) {
    this.addFunction("let", (name, value) => ({
      _extendContext: _({}).set(name, value).value(),
      _value: value,
    }));
    this.addFunction("letIfNo", (name, value) =>
      this.context[name]
        ? this.context[name]
        : {
            _extendContext: _({}).set(name, value).value(),
            _value: value,
          }
    );
  }
  addFunction(name: string, func) {
    this._jexl.addFunction(name, func);
  }
  async eval(code: string): Promise<[any, object]> {
    const re: any = await this._jexl!.eval(code, this.context);
    if (re && re["_extendContext"]) {
      const { _extendContext, _value } = re;
      return [_value as any, deepMerge(this.context, _extendContext)];
    } else {
      return [re, this.context];
    }
  }
  async evalLines(lines: string[]): Promise<[any, object]> {
    let result;
    for (let i in lines) {
      const line = lines[i];
      result = await this.eval(line);
      this.context = result[1];
    }
    return result;
  }
}
