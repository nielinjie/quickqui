import { ValidateLog } from "./ModelValidator";
import { Model } from "./Model";

import { Log, ModelWeaver } from ".";

export interface ModelDefineConfig {
  name: string;
  filePattern?: string;
  objectPattern?: string;
  extend: Promise<any>;
}
export class NormalizeLog implements Log {
  category: string = "model-normalize";
  level: string;
  message: string = "";
  context: string = "";
  constructor(context: string, message: string, level: string = "info") {
    this.message = message;
    this.context = context;
    this.level = level;
  }
}
export interface ModelDefine {
  name: string;
  filePattern?: string;
  objectPattern?: string;
  validatePiece(piece: any, model: Model, buildingContext?: any): ValidateLog[];
  normalize?(model: Model, piece: any): [any, NormalizeLog[]];
  merge(model: Model, piece: any, buildingContext?: any): Model;
  validateAfterMerge(model: Model): ValidateLog[];
  validateAfterWeave(model: Model): ValidateLog[];
  weavers: ModelWeaver[];
}

