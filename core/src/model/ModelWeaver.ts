import { Log } from "./Log"
import { Model } from "./Model"


export interface ModelWeaver {
    name: string;
    order?:number
    weave(model: Model): [Model, WeaveLog[]];
}

export class WeaveLog implements Log {
    level: string = 'info'
    category: string = 'model-weave'
    message: string = ''
    context: string =''
    constructor(context:string,message: string,error:boolean=false) {
        this.message = message
        this.context = context
        if(error){
            this.level = 'error'
        }
    }
}

export interface ModelWeaverConfig {
    name:string;
    extend:Promise<ModelWeaver>;
}
