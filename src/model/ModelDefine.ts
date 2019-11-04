import { ValidateError } from "./ModelValidator";
import { Model } from "./Model";


export interface ModelDefineConfig {
    name: string;
    filePattern: string;
    extend: Promise<any>;
}




export interface ModelDefine<PT> {
    name: string;
    filePattern: string;
    toPiece(source: object): PT
    //TODO toPiece和validatePiece是不是要合并合并？
    validatePiece(piece: PT): ValidateError[]
    merge(model: Model, piece: PT): Model
    validateAfterMerge(model: Model): ValidateError[]
    validateAfterWeave(model: Model): ValidateError[]
}






