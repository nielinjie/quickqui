import { Model, NormalizeLog } from "@quick-qui/model-core";
import { normalizeByRules, withDebug } from "./normalizer";
import { onlyMerger, simpleMerger } from "../util";
import {
  DotAsNestRule,
  MapToArrayRule,RelocateRule,insertF
} from "@nielinjie/shorthand";
const functionModels = {
  ...onlyMerger(),

  normalize: (model: Model, piece: any): [any, NormalizeLog[]] => {
    return normalizeByRules(model, piece, [
      new MapToArrayRule("$.functions", "name"),
      new MapToArrayRule("$..links", "label"),
      new DotAsNestRule("$.functions[*]", "."),
      new RelocateRule(
        "$.functions[*]",
        "sort",
        insertF("query")
      )
    ]);
  },
  merge: simpleMerger("functions", "functionModel.functions"),
};
export default functionModels;
