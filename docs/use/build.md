# 生成成品

俗称“**打包**”。将模型和实现进行最终结合，生成可运行的“包”，也就是运行所需的全部资源，比如文件、目录、配置、环境参数等等。

**成品**的目标是，放置到目标环境以后，通过一个简单的命令，就可以运行。成品可能有不同的**成品类型**，以适应不同的目标环境。

能进行打包的工具，称为“**打包工/Builder**”。不同的成品类型，可能需要不同的打包工来支持。

## 实现模型

**实现模型**是描述实现的模型，成品是根据这个模型的描述来生成的。

参见[实现模型](ref/model.md#Implementation)

## 运行打包

`npx @quick-qui/builder`

需要两个环境参数 - 
1. DIST_DIR - 成品包/目录放置的路径。
2. LAUNCHER_NAME 或者 LAUNCHER_TYPE - 成品类型，或者成品名称，对应于 Implementation模型中 Implementation 的类型或者名字。 参见[实现模型](ref/model.md#Implementation)

## 成品类型

目前支持的**成品类型**有 -

1. raw - 仅适合在开发 quick-qui相关组件时，会启动在约定相对路径下的依赖组件，比如 model-server，会启动../model-server 目录里的程序。
2. npm - 将依赖组件以 npm 依赖包的形式引用，并作为子进程启动。适合作为一般的运行时。
3. docker - 将依赖组件以 docker image 的形式引用。启动时需要 docker、docker-compose 的支持。适合 web 服务等运行时。
4. electron - 类似于 npm 模式，但会包装一层 electron 在外。适合有 UI 需求的桌面运行时。

每种成品类型的详细说明请见[参考 - 生成](ref/build.md)

## 打包工/Builder

目前已知存在的打包工有 - 

1. [@quick-qui/builder](https://github.com/quickqui/builder)，可以支持创建 raw、npm、docker、electron 类型的成品。