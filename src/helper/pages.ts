import { MapToArrayRule } from "@nielinjie/shorthand";
import { Model, NormalizeLog } from "@quick-qui/model-core";
import _ from "lodash";
import { onlyMerger, simpleMerger } from "../util";
import { normalizeByRules } from "./normalizer";

const presentationModels = {
  ...onlyMerger(),
  normalize: (model: Model, piece: any): [any, NormalizeLog[]] => {
    return normalizeByRules(model, piece, [
      new MapToArrayRule("$.pages", "name"),
      new MapToArrayRule("$..places", "function"),
    ]);
  },
  merge: simpleMerger("pages", "pageModel.pages"),
};
export default presentationModels;
