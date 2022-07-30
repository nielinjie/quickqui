import { ModelManager } from "./ModelManager";
import path from "path";
import {
  withDomainModel,
  withInfoModel,
} from "@quick-qui/model-defines";

describe("models", () => {
  const proPath = path.join(process.cwd(), "./testModelFolder");

  test("empty folder", () => {
    const manager = new ModelManager(
      {
        protocol: "folder",
        resource: "./testModel",
      },
      "."
    );
    expect(manager).not.toBeUndefined;
  });

  test("a typical model", async () => {
    expect.hasAssertions();
    const manager = new ModelManager(
      {
        protocol: "folder",
        resource: path.join(proPath, "model"),
      },
      proPath
    );
    expect(manager).not.toBeUndefined;
    const model = await manager.getModel();
    expect(model).not.toBeUndefined;
    expect(manager.getBuildLogs().length).not.toBe(0);
    // console.log(manager.getBuildLogs())
    expect(withDomainModel(model)?.domainModel?.entities?.length).not.toBe(0);
    expect(withInfoModel(model)?.infoModel).not.toBeUndefined;
  });

  test.skip("a typical model with evaluate", async () => {
    expect.hasAssertions();
    console.log(`${proPath}`);
    const manager = new ModelManager(
      {
        protocol: "folder",
        resource: path.join(proPath, "model"),
      },
      proPath
    );
    expect(manager).not.toBeUndefined;
    const model = await manager.getModel();
    expect(model).not.toBeUndefined;
    expect(manager.getBuildLogs().length).not.toBe(0);
    expect(withDomainModel(model)?.domainModel?.entities?.length).not.toBe(0);
    expect(withInfoModel(model)?.infoModel).not.toBeUndefined;
   
    expect(
      (model as any)?.implementationModel?.implementations
    ).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          env: expect.objectContaining({ PORT: 4001 }),
        }),
        expect.objectContaining({
          env: expect.objectContaining({
            APP_SERVER_URL: "http://localhost:4001",
          }),
        }),
      ])
    );
  });
});
