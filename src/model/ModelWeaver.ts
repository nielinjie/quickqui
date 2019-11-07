import { Log } from "./Log"
import { Model } from "./Model"
import * as t from 'io-ts';


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
export const modelWeaverRT = t.type({
    name:t.string,
    // TODO, instance的方法不是这样的。https://github.com/gcanti/io-ts/issues/272
    // weave:t.Function
})