import { Model } from './Model';
import { Log } from './Log';
export interface ModelValidator {
    validate(model: Model): ValidateError[]
}

export class ValidateError implements Log {
    category: string = 'validate'
    level: string = 'error'
    message: string = ''
    constructor(message: string) {
        this.message = message
    }
}