import {
  ChildRule,
  DotAsNestRule,
  MapToArrayRule,
  ShortOnParentRule,
} from "@nielinjie/shorthand";
import { Model, NormalizeLog } from "@quick-qui/model-core";
import Joi from "joi";
// import _ from "lodash";
import { onlyMerger, simpleMerger } from "../util";
import { normalizeByRules } from "./normalizer";

const infos = {
  ...onlyMerger(),
  normalize: (model: Model, piece: any): [any, NormalizeLog[]] => {
    return normalizeByRules(model, piece, [
      new MapToArrayRule("$.entities", "name"),
      new MapToArrayRule("$.entities[*].properties", "name"),
      new ShortOnParentRule("$..properties[*]", [
        new ChildRule("relation", Joi.string().regex(/^(one|many)\-(\w+)$/)),
        new ChildRule("type", Joi.string()),
        new ChildRule("constraints", Joi.array().items(Joi.string())),
      ]),
      //new DotAsNestRule("$..properties", "."),
      new ShortOnParentRule(
        "$..relation",
        [
          new ChildRule("n", Joi.string().valid("one", "many")),
          new ChildRule("to", Joi.string()),
        ],
        "-"
      ),
    ]);
  },
  merge: simpleMerger("entities", "domainModel.entities"),

  // merge: pipe(
  //   simpleMerger("infos", "infoModel.infos"),
  //   simpleMerger("entities", "domainModel.entities")
  // ),
};
export default infos;
