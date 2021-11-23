import { Model, ValidateError } from "@quick-qui/model-core";
import _ from "lodash";
import { mergeInPath } from "@quick-qui/model-defines";

export type MergerFun = (
  model: Model,
  piece: any,
  buildingContext: any
) => Model;
export function pipe(a: MergerFun, b: MergerFun): MergerFun {
  return (model: Model, piece: any, buildingContext: any): Model => {
    return b(a(model, piece, buildingContext), piece, buildingContext);
  };
}
export function simpleMerger(piecePath: string, modelPath: string): MergerFun {
  return (model: Model, piece: any, buildingContext: any): Model => {
    let m = model;
    if (piece[piecePath]) {
      m = mergeInPath(
        m,
        modelPath.split("."),
        piece[piecePath] ?? [],
        buildingContext
      );
    }
    return m;
  };
}
export function onlyMerger() {
  return {
    validatePiece(piece: any): ValidateError[] {
      return [];
    },

    validateAfterMerge(model: Model): ValidateError[] {
      return [];
    },
    validateAfterWeave(model: Model): ValidateError[] {
      return [];
    },
    weavers: [],
  };
}
