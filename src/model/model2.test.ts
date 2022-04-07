import { Log } from "@quick-qui/model-core";
import { ModelManager } from "@quick-qui/model-server/dist/model/ModelManager";
import path from "path";
test("a typical model", async () => {
  expect.hasAssertions();
  const proPath = path.join(process.cwd(), "./testModelFolder");
  const manager = new ModelManager(
    {
      protocol: "folder",
      resource: path.resolve(proPath),
    },
    process.cwd()
  );
  expect(manager).not.toBeUndefined;
  const model = await manager.getModel();
  const logs = await manager.getBuildLogs();
  expect(logs.length).not.toBe(0);
  expect(hasError(logs)).toBe(false);
  expect(model).toEqual(
    expect.objectContaining({
      pageModel: expect.objectContaining({
        pages: expect.arrayContaining([
          expect.objectContaining({ name: "testPage" }),
        ]),
      }),
      functionModel: expect.objectContaining({
        functions: expect.arrayContaining([
          expect.objectContaining({ name: "testFunction" }),
        ]),
      }),
      infoModel: expect.objectContaining({
        infos: expect.arrayContaining([
          expect.objectContaining({ name: "testInfo" }),
        ]),
      }),
    })
  );
});

function hasError(logs: Log[]): boolean {
  return logs.some((log) => log.level === "error");
}