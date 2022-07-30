import { ModelRepository } from "../model/ModelRepository";

import * as path from "path";

import { FolderRepository } from "./FolderRepository";
import { existsSync, fstatSync } from "fs";

interface Library {
  type: string;
  dir: string;
  module: string;
}
// 利用惯有package管理方法引入model文件，比如npm引入model文件，然后从./node_modules之类的相关文件夹获得model文件。

export class LibraryRepository {
  static async build(library: Library, root: string): Promise<ModelRepository> {
    let folder: string | undefined = undefined;
    if (library.type === "npm") {
      // NOTE: 需要使用resolve机制，而不是硬写路径。
      // folder = path.join(root, "node_modules", library.module, library.dir);
      let paths = require.resolve.paths(library.module)
      // console.log('paths of resole', paths)
      paths?.forEach(p => {const tp = path.join(p, library.module,library.dir)
        if (existsSync(tp)){
          folder = tp
          // console.log("folder find ", folder)
        }})

      // let folderRoot = require.resolve(library.module, { paths: [root] })
      // folder = folderRoot ? path.join(folderRoot, library.dir) : undefined
    }
    if (folder)
      return FolderRepository.build(
        folder,
        folder,
        `library source - ${JSON.stringify(library)}`,
        library.module
      );
    throw new Error(`no such ${JSON.stringify(library)}`);
  }
}
