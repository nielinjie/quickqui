# @quick-qui/app-server

实现的一部分。类似于常见的”三层架构“中的后台服务部分。按照模型的要求提供能力。典型的包括 -

1. 实体模型和功能模型要求的服务接口。
1. 交换模型要求的外部服务调用。
1. 交换模型要求的对外部提供的服务。

## 如何工作

1. 以nodejs应用运行。
1. 从[model-server](http://github.com/quickqui/model-server)取得模型和必要的模型扩展代码。
1. 根据模型，动态提供能力。


MODEL_PATH=../prototype MODEL_URL=http://localhost:5111 PORT=4001 IMPLEMENTATION_NAME=issue-raw-back npm start