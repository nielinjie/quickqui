export { dockerLaunch, modelServerConfig } from "./DockerLauncher";
export { rawLaunch } from "./RawLauncher";
export { filterObject, noEnvFound } from "./Util";
import assert, { fail } from "assert";
import { ImplementationModel } from "@quick-qui/model-defines";
import { dockerLaunch } from "./DockerLauncher";
import { rawLaunch } from "./RawLauncher";

export function launch(implementationModel: ImplementationModel) {
  const launcherType = process.env["LAUNCHER_TYPE"];
  const launcherName = process.env["LAUNCHER_NAME"];

  const launcherImplementation = implementationModel?.implementations.find(
    (implementation) =>
      (implementation.abstract ?? false) !== true &&
      implementation.runtime === "launcher" &&
      ((launcherName ? implementation.name === launcherName : false) ||
        launcherType === implementation.parameters?.type)
  );

  if (launcherImplementation) {
    if (launcherType === "docker") {
      dockerLaunch(launcherImplementation, implementationModel);
    } else if (launcherType === "raw") {
      rawLaunch(launcherImplementation, implementationModel);
    } else if (launcherType === "node") {
      //TODO
      fail(`launcher type not supported yet - ${launcherType}`);
    } else {
      fail(`launcher type not supported yet - ${launcherType}`);
    }
  } else {
    fail(`no launcher found - name=${launcherName}`);
  }
}
