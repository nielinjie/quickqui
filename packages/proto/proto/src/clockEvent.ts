import { implementationGlobal } from "@quick-qui/implementation-model";
setInterval(() => {
  const bus = implementationGlobal["eventBus"];
  if (bus) {
    bus.emit("timeEvent",'clockEvent', { time: new Date() });
  }
}, 10000);
export default {name:'clock'}
