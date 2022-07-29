# @quick-qui/builder

从一个模型项目生成运行时所需的全部材料。包括各个实现运行起来所需的全部材料。俗称“打包”。

生成的材料一般是一个目录，称为“成品目录”，包括了在某种通用环境、前提下可以运行起来的所有所需。比如源代码、编译后的代码、静态资源、依赖等等，根据运行时类型不同而不同。

目前支持的运行种类如下 -

1. docker - 运行为一个 docker-compose 配置，在支持 docker-compose 的桌面/服务器运行。依赖于各实现的 docker 镜像。
2. raw - 运行为多个本地进程。各实现在当前目录之外，比如相对目录下（../xxx）。此种运行时一般只出现在@quick-qui 本身的开发场景里。方便调试@quick-qui本身机制和各实现。
3. （🏃🏻WIP）npm - 运行为多个本地进程。各实现被作为 npm 依赖安装在当前目录下。
4. （🏃🏻WIP）eLectron - 作为 Npm 运行时种类的一种扩展。除了运行各实现以外，还会把 electron 相关依赖打包进来。

## 如何工作

## 如何运行

作为node脚本直接运行 - `npm start`

## 所需环境

|               |          |                                |                                                              |
| ------------- | -------- | ------------------------------ | ------------------------------------------------------------ |
| MODEL_PATH    | 环境变量 | string， 必填。                | 指出模型项目所在的路径。本地路径，可以是相对路径。           |
| DIST_DIR      | 环境变量 | string， 必填。                | 指出“成品目录”所在路径。本地路径，可以是相对路径。           |
| LAUNCHER_TYPE | 环境变量 | string， 可选， 默认是“docker“ | 指出 launcher 的类型，也就是运行时的类型。 可能是 docker/raw/npm/electron... |
| LAUNCHER_NAME | 环境变量 | string， 可选                  | 指出 launcher 的名称，优先级高于 LAUNCHER_TYPE。             |