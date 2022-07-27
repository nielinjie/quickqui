import {
  GET_ONE,
  forResourceAndFetchTypeOneParam,
  GetOneResult,
  CREATE,
  w,
} from "@quick-qui/data-provider";
import { v4 as uuidV4 } from "uuid";
import { logger } from "./util";

const clockDp = forResourceAndFetchTypeOneParam("clock", GET_ONE, (param) =>
  Promise.resolve({
    data: { id: "_default", time: JSON.stringify(new Date()) },
  } as GetOneResult<unknown>)
);
const setTime = forResourceAndFetchTypeOneParam(
  "setTimeRequest",
  CREATE,
  (param) => {
    logger.info(param);
    return Promise.resolve({ data: { id: uuidV4() } });
  }
);
export default w(clockDp).chain(setTime).value();
