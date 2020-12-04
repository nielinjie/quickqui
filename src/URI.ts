import * as uri from "uri-js";
import { fail } from "assert";
import "./extensions";

export interface URI {
  scheme?: string;
  host?: string; // '//'开头的才是host， 如果没有‘//’就全部在path里面
  path?: string[];
}

export function parse(str: string, insure?: URI): URI {
  const u = uri.parse(str);
  const re = {
    scheme: u.scheme,
    host: u.host,
    path: u.path?.p((_) => _.split("/")),
  };
  if (insure) {
    if (insure.scheme && insure.scheme !== re.scheme) {
      fail(`scheme not match - ${re.scheme} != ${insure.scheme}`);
    }
    if (insure.host && insure.host !== re.host) {
      fail(`host not match - ${re.host} != ${insure}`);
    }
    if (insure.path) {
      fail(`insure path is not supported`);
    }
  }
  return re;
}
