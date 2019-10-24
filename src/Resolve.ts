import { env } from "./Env";
import * as path from 'path';
function _interopRequireDefault(obj: any) {
    console.log(obj)
    return obj && obj.__esModule ? obj : { default: obj };
}

export const resolve = <T extends unknown>(pathStr: string, baseDir: string): Promise<T> => {
    path.resolve(baseDir, pathStr)
    let re = tryResolve(path.resolve(baseDir, pathStr))
    if (!re) {
        re = tryResolve(path.resolve(baseDir, '..', pathStr))
    }
    if (!re) {
        re = tryResolve(path.resolve(baseDir, '../dist', pathStr))
    }
    console.log(re)
    if(!re){
        throw new Error(`can not find ${pathStr} in ${baseDir}`)
    }
    return import(
        re!
    ).then(obj => (_interopRequireDefault(obj).default) as T);

    // if (env.name === "dev_docker") {
    //     return import(`../../../extendDir/dist/${path}`).then(obj => _interopRequireDefault(obj).default as T);
    // }
    // throw new Error("Only can resolve an known path")
};
function tryResolve(name: string): string | undefined {
    try {
        return require.resolve(name)
    }
    catch (err) {
        if (err.code === 'MODULE_NOT_FOUND') {
            return undefined
        } else {
            throw err
        }
    }
}