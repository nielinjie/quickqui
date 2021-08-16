import { ValidateError } from "./ModelValidator";
import { Model } from "./Model";

import * as t from "io-ts";
import { ModelWeaver } from ".";
import { modelWeaverRT } from "./ModelWeaver";

export interface ModelDefineConfig {
  name: string;
  filePattern: string;
  extend: Promise<any>;
}

export interface ModelDefine {
  name: string;
  filePattern: string;
  validatePiece(
    piece: any,
    model: Model,
    buildingContext?: any
  ): ValidateError[];
  normalize?(model: Model, piece: any): any;
  merge(model: Model, piece: any, buildingContext?: any): Model;
  validateAfterMerge(model: Model): ValidateError[];
  validateAfterWeave(model: Model): ValidateError[];
  weavers: ModelWeaver[];
}

export const modelDefineRuntimeType = t.type({
  name: t.string,
  filePattern: t.string,
  validatePiece: t.Function,
  merge: t.Function,
  validateAfterMerge: t.Function,
  validateAfterWeave: t.Function,
  weavers: t.array(modelWeaverRT),
});
