# QuickQui

快速业务原型工具。

🥚🐣🐥

## 目标

### 问题

一方面，创业者和业务创新者需要最小系统来验证业务设计。

另一方面，系统设计者也需要一个手段，与相关领域专家讨论系统要求。 

1. 尽早开始、迭代进行
2. 聚焦业务、统一语言
3. 控制好成本

### 解决方案

QuickQui是一套机制和相应工具。用于支持开发者与客户的充分沟通，对业务需求迅速定义，产出用于演示业务的原型系统。

1. 快速搭建业务原型。
   1. （业务原型不是操作界面原型。）
   2. 快速定义业务模型，首先表现为数据模型定义。
   3. 基本功能自动生成，用于展现业务概念 - 表单和CRUD、报表和图表、工作流、接口和事件。
2. 快速取得反馈。
   1. 实际可运行的原型。
      1. 广泛可达，支持多用户实际操作，比如部署到云。
      2. 基本的操作容错，比如数据权限控制。
      3. 起码的用户体验，界面符合基本审美。
   2. 快速迭代与可修改。
      1. 自动生成、部署可运行的原型。
      2. 所有修改集中到业务模型层面。
3. 快速获取生意。
   1. 原型可以快速转化为生成系统。如果不能自动地，至少可以机械地。

## 设计

### 逻辑设计

如下图。
![QuickQui 逻辑设计](./doc/QuickQui%20逻辑设计.png)

### 现阶段实现设计

如下图。  

1. 目前没有单独的业务层定义，直接借用数据定义。


![QuickQui 阶段1](./doc/QuickQui%20阶段1.png)

## 实现

### 子项目

1. prototype
2. model-server
3. （……）

### 技术栈

1. GraphQL
2. Prisma
2. React
3. React-admin
3. （……）

## 参与

欢迎一切形式的参与，请先联系本项目的owner。

## Liscense
