
import { LowWrapper } from "./lowWrapper";
import dpFromLowDB from "./lowdbDP";
import LocalStorage from "lowdb/adapters/LocalStorage";
import Memory from "lowdb/adapters/Memory";
import { AdapterSync } from "lowdb";
import { SessionStorage } from "./SessionStorageAdapter";
export * from "./lowWrapper";
export * from './lowdbDP'
export function localStorageDp(source: string, initData: object = {}) {
  return dpFromLowDB(new LowWrapper(initData, new LocalStorage(source)));
}
export function sessionStorageDp(source: string, initData: object = {}) {
  return dpFromLowDB(new LowWrapper(initData, (new SessionStorage(source)) as any as AdapterSync<unknown>));
}

export function memoryDp(initData: object = {}) {
  return dpFromLowDB(new LowWrapper(initData, new Memory("")));
}
