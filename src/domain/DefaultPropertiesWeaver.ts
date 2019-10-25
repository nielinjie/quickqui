import { Entity } from "./DomainModel";
import * as _ from "lodash";
import { ModelWeaveLog } from "../model/ModelWeaver";
import { ModelWeaver } from "../model/ModelWeaver";
import { Model } from "../model/Model";
import { forEachEntity } from "./DomainExtends";

//TODO 这个weaver不一定是domain基础级的。不是数据库就一定要这个。
export class DefaultPropertiesWeaver implements ModelWeaver {
    name = "defaultProperties";
    weave(model: Model): [Model, ModelWeaveLog[]] {
        return forEachEntity(model, defaultProperties);
    }
}

function defaultProperties(entity: Entity): [Entity, ModelWeaveLog] {
    return [_.assign(entity, {
        properties: entity.properties.concat(
            [
                { name: 'id', type: 'ID', constraints: ['required'] },
                { name: 'createdAt', type: 'DateTime', constraints: ['required'] },
                { name: 'updatedAt', type: 'DateTime', constraints: ['required'] }
            ]
        ),
    }), new ModelWeaveLog(
        `Added default properties for entity/${entity.name}`
    )]
}