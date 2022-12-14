// in App.js
import React, { Component } from "react";
import { Admin, Resource } from "react-admin";
import { env } from "./Env";

import _ from "lodash";

import { ModelWrapped } from "./Model/Model";
import Menu from "./View/Menu";
import { onInit } from "./life/frontLife";

import customRoutes from "./customRoutes";
import { wsSagas } from "./socket";

import {
  implementationGlobal,
  withImplementationModel,
} from "@quick-qui/implementation-model";

import {
  withoutAbstract,
  withInfoModel,getResources
} from "@quick-qui/model-defines";
import dp3 from "./data/dp3";

import { model } from "./Model/Model";

import { dataProvider as dp } from "./data/dataProvider";
import AutoSavingSaga from "./data/AutoSavingSaga";

import { createBrowserHistory as createHistory } from "history";
import EventReducer from "./event/EventReducer";
const history = createHistory();
const log = console;
class App extends Component {
  constructor() {
    super();
    this.state = { dataProvider: null, model: null };
  }
  componentDidMount() {
    onInit().then(() => {
      //TODO 处理404，也就是model没有，但有logs。，包括要从其他错误中区分出来。

      model.then(async (data) => {
        //TODO inject implementationGlobals
        //NOTE 需要指导自己是从哪个implementation 模型而来，参照app-server
        //NOTE 怎么才能从launcher把implementation name传过来？
        // console.log('env',env)
        const e =(await env)
        console.log("env in did mount -")
        console.log(e)
        const impl = withImplementationModel(
          data
        )?.implementationModel?.implementations.find(
          (implementation) => implementation.name === e.implementationName
        );
        if (impl) {
          console.log("implementation", impl);
          if (impl.injections?.includes("env")) {
            implementationGlobal["env"] = env;
          } else {
            log.warn("env injection is disable");
          }
          if (impl.injections?.includes("dataProvider")) {
            const re = (await dp)[0];
            console.log("dataP inject", re);
            implementationGlobal["dataProvider"] = re;
          } else {
            log.warn("dataProvider injection is disable");
          }
        }

        const model = new ModelWrapped(data);
        // const functions = withoutAbstract(model.functionModel?.functions) ?? [];
        // const entityNames = (model.domainModel?.entities ?? []).map(
        //   (entity) => entity.name
        // );

        // const resources = _(functions.map((fun) => fun.resource))
        //   .concat(entityNames)
        //   .compact()
        //   .uniq()
        //   .value();
        const infoModel = withInfoModel(model.original)?.infoModel;
        const resources = infoModel ? getResources(infoModel) : [];
        this.setState({
          ...this.state,
          model,
          resources,
        });
        dp.then((dataProvider) =>
          this.setState({
            ...this.state,
            dataProvider: dataProvider,
          })
        );
      });
    });
  }

  render() {
    const { dataProvider, model, resources } = this.state;

    // if (!dataProvider || !model || !resources || resources.length===0) {
    if (!dataProvider || !model || !resources) {
      // if (!model || !resources) {
      return <div>Loading</div>;
    }
    // if(!this.state?.admin?.resources){
    //   return <div>Loading Resource</div>
    // }
    return (
      <Admin
        customRoutes={customRoutes(model)}
        menu={Menu}
        dataProvider={dp3(dataProvider[0])}
        customSagas={[...dataProvider[1], AutoSavingSaga, wsSagas]}
        customReducers={{ events: EventReducer }}
        history={history}
        // authProvider={authProvider}
      >
        {resources.map((resource) => {
          return (
            <Resource options={{ model }} name={resource} key={resource} />
          );
        })}
      </Admin>
    );
  }
}

export default App;
