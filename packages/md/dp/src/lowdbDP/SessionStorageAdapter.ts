import { AdapterSync } from "lowdb";
import Base from "lowdb/adapters/Base";
//TODO type有点问题，可能是@types/lowdb 中有点错误。因为下面的代码完全是从localStorageAdapter抄的。
// https://github.com/typicode/lowdb/blob/v1.0.0/src/adapters/LocalStorage.js
export class SessionStorage extends Base  {
  read() {
    const data = sessionStorage.getItem(this.source);
    if (data) {
      return this.deserialize!(data);
    } else {
      sessionStorage.setItem(this.source, this.serialize!(this.defaultValue));
      return this.defaultValue;
    }
  }

  write(data: object): void {
    sessionStorage.setItem(this.source, this.serialize!(data));
  }
}
