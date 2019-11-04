import { Log } from "./Log"
import { Model } from "./Model"


export interface ModelWeaver {
    name: string;
    weave(model: Model): [Model, ModelWeaveLog[]];
}

export class ModelWeaveLog implements Log {
    level: string = 'info'
    category: string = 'model-weave'
    message: string = ''
    constructor(message: string) {
        this.message = message
    }
}

export interface ModelWeaverConfig {
    name:string;
    extend:Promise<ModelWeaver>;
}