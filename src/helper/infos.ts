import { MapToArrayRule } from "@nielinjie/shorthand";
import { Model, NormalizeLog } from "@quick-qui/model-core";
// import _ from "lodash";
import { onlyMerger, simpleMerger } from "../util";
import { normalizeByRules } from "./normalizer";

const infos = {
  ...onlyMerger(),
  normalize: (model: Model, piece: any): [any, NormalizeLog[]] => {
    return normalizeByRules(model, piece, [
      new MapToArrayRule("$.infos", "name"),
      // new MapToArrayRule("$.entities", "name"),
    ]);
  },
  merge: simpleMerger("infos", "infoModel.infos"),

  // merge: pipe(
  //   simpleMerger("infos", "infoModel.infos"),
  //   simpleMerger("entities", "domainModel.entities")
  // ),
};
export default infos;
