import { Model } from './Model';
import { Log } from './Log';
export interface ModelValidator {
    validate(model: Model): ValidateError[]
}

export class ValidateError implements Log {
    category: string = 'model-validate'
    level: string = 'error'
    message: string = ''
    context:string = ''
    constructor(context:string,message: string) {
        this.message = message
        this.context = context
    }
}