# 使用说明

请先了解“[工作原理](work.md)”

## 快速开始

### 生成模型项目

`npm init @quick-qui` 或者 `npx @quick-qui/create`
实际上都是运行的@quick-qui/create这个包。

参见 [@quick-qui/create](http://github.com/quickqui/create)

### 生成成品目录

俗称“打包”。将模型和实现进行最终结合，生成可运行的全部文件。

### 运行成品



## 模型开发

1. 生成的模型项目中，有./model目录，目录中的文件即是对模型的描述。可以直接编辑其中的文件。
2. 运行model-server，对模型文件进行处理。访问model-server提供的接口，可以随时得到最终模型。参见[@quick-qui/model-server](http://github.com/quickqui/model-server)
3. 目前有model-front，作为模型查看的工具。后续会继续完善并考虑发展成为可以进行编辑的工具。参见[@quick-qui/model-front](http://github.com/quickqui/model-front)

## 实现开发

## 生成成品