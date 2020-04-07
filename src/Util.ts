
import parse from "url-parse";
import waitPort from "wait-port";

export function filterObject(obj: any) {
  const ret: any = {};
  Object.keys(obj)
    .filter(key => obj[key] !== undefined)
    .forEach(key => (ret[key] = obj[key]));
  return ret;
}

export function no(name: string) {
  throw new Error(`env not found - ${name}`);
}


export function waitForUrlPort(urlString: string):Promise<any>{
  const url = parse(urlString);
  const params = {
    host: url.host,
    port: +url.port
  };
  return waitPort(params);
}