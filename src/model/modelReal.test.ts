import { Log, Model } from "@quick-qui/model-core";
import { ModelManager } from "@quick-qui/model-server/dist/model/ModelManager";
import path from "path";
test("a typical model", async () => {
  expect.hasAssertions();
  const proPath = path.join(process.cwd(), "./testRealFolder");
  const manager = new ModelManager(
    {
      protocol: "folder",
      resource: path.resolve(proPath),
    },
    process.cwd()
  );
  expect(manager).not.toBeUndefined;
  const model = await manager.getModel();
  expect(model).not.toBeUndefined;
  const logs = await manager.getBuildLogs();
  expect(logs.length).not.toBe(0);
  dump(logs);
  expect(hasError(logs)).toBe(false);
  if (hasError(logs)) {
    console.log("error logs :>> ", logs);
  }
});
test("a real only with functions", async () => {
  expect.hasAssertions();
  const { model, manager } = await buildModelFromFolder(
    "./testRealFunctionsModelFolder"
  );
  expect(model).not.toBeUndefined;
  const logs = await manager.getBuildLogs();
  expect(logs.length).not.toBe(0);
  dump(logs);
  expect(hasErrorMoreThan(logs, "no info model find")).toBe(false);
  
});

test("a real only with infos", async () => {
  expect.hasAssertions();
  const { model, manager } = await buildModelFromFolder(
    "./testRealInfosModelFolder"
  );
  expect(model).not.toBeUndefined;
  const logs = await manager.getBuildLogs();

  expect(logs.length).not.toBe(0);
  expect(hasError(logs)).toBe(true);
  expect(hasErrorMoreThan(logs, "no entity for resource find")).toBe(false);
});
test("a real  with infos and entities", async () => {
  expect.hasAssertions();
  const { model, manager } = await buildModelFromFolder(
    "./testRealDomainModelFolder"
  );
  expect(model).not.toBeUndefined;
  const logs = await manager.getBuildLogs();

  expect(logs.length).not.toBe(0);
  if (hasError(logs)) {
    dump(logs);
    fail("have errors");
  }
});

async function buildModelFromFolder(modelFolder: string) {
  const proPath = path.join(process.cwd(), modelFolder);
  const manager = new ModelManager(
    {
      protocol: "folder",
      resource: path.resolve(proPath),
    },
    process.cwd()
  );
  expect(manager).not.toBeUndefined;
  const model = await manager.getModel();
  return { model, manager };
}

function hasError(logs: Log[]): boolean {
  return logs.some((log) => log.level === "error");
}
function dump(logs: Log[], onlyError = true) {
  logs.forEach((log) => {
    if (onlyError) {
      if (log.level === "error") {
        console.log("log only ERROR :>> ", log);
      }
    } else console.log("log :>> ", log);
  });
}
function hasErrorMoreThan(logs: Log[], message: string) {
  return logs.some(
    (log) => log.level === "error" && !log.message.startsWith(message)
  );
}
import jsonPath from "@nielinjie/shorthand/dist/jsonPath";
function dumpModel(model: Model, path: string = "$") {
  const obj = jsonPath.value(model, path);
  console.log("obj :>> ", JSON.stringify(obj, null, 2));
}
