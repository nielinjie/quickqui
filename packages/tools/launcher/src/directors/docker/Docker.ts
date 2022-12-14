import {  StringKeyObject } from "@quick-qui/model-defines";
import { Implementation } from "@quick-qui/implementation-model";

import _ from "lodash";

export function docker(
  implementation: Implementation,
  globalEnv: StringKeyObject
): ComposeConfig {
  const env = implementation.env ?? {};

  return {
    service: implementation.name,
    ports: implementation.parameters?.["ports"],
    image: implementation.parameters?.["image"],
    links: implementation.parameters?.["links"],
    volumes: implementation.parameters?.["volumes"],
    depends_on:
      implementation.parameters?.["dependsOn"] ||
      implementation.parameters?.["depends_on"],
    stdin_open:
      implementation.parameters?.["stdin_open"] ||
      implementation.parameters?.["stdinOpen"],
    environment: _.toPairs(_.extend({}, globalEnv, env)).map(
      (p) => `${p[0]}=${p[1]}`
    ),
  };
}

export interface ComposeConfig {
  service: string;
  ports: number[];
  image: string;
  links: string[];
  volumes: string[];
  environment: string[];
  depends_on: string[];
  //MARK 还有其他的么？可能没有例举完。
  stdin_open: boolean;
}
