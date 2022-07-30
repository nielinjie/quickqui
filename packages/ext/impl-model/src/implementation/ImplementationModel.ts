import { Model } from "@quick-qui/model-core";
import {
  WithNamespace,
  StringKeyObject,
  Extendable,
  WithParameters,
} from "@quick-qui/model-defines";
import { WithAnnotations } from "@quick-qui/model-defines";

export function withImplementationModel(
  model: Model
): WithImplementationModel | undefined {
  if ((model as any).implementationModel) {
    return model as WithImplementationModel;
  } else {
    return undefined;
  }
}



export interface WithImplementationModel {
  implementationModel: ImplementationModel;
}

export interface ImplementationModel {
  implementations: Implementation[];
}

export interface Implementation
  extends WithAnnotations,
    WithNamespace,
    Extendable,
    WithParameters {
  lifeCycle?: StringKeyObject;
  injections?: string[];
  runtime: string;
  env?: StringKeyObject
}

//TODO 草稿，不一定需要。
export interface Deployment {
  name: string;
  //NOTE docker/npm/../outer?
  type: string;
}
