import { ValidateError } from "./ModelValidator";
import { Model } from "./Model";

import * as t from 'io-ts'


export interface ModelDefineConfig {
    name: string;
    filePattern: string;
    extend: Promise<any>;
}




export interface ModelDefine {
    name: string;
    filePattern: string;
    validatePiece(piece: any, model: Model): ValidateError[]
    merge(model: Model, piece: any): Model
    validateAfterMerge(model: Model): ValidateError[]
    validateAfterWeave(model: Model): ValidateError[]
}

export const modelDefineRuntimeType = t.type({
    name: t.string,
    filePattern: t.string,
    validatePiece: t.Function,
    merge: t.Function,
    validateAfterMerge: t.Function,
    validateAfterWeave: t.Function
})




