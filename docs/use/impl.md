# 实现开发

实现就是使模型可以运行的代码。

实现可能分为下面两个层次，但这两个层次的分工不是绝对的，而是相对的，当发现特殊实现有通用价值重用价值，就上升为普适实现。 - 

1. 普适实现
2. 特殊实现

## 普适实现
对某一类模型进行的普遍实现。在具体项目中是被引用和被重用的。比如 quick-qui项目自带的两个普适实现，凡采用 web 技术、三层架构的项目都可以引用和重用 -
1. [@quick-qui/front](https://github.com/quickqui/front)
2. [@quick-qui/app-server](https://github.com/quickqui/app-server)


## 特殊实现
对于某个具体的项目，需要的特殊实现方式。比如某个项目需要访问一个具体的数据接口，而此种接口并没有适合的普适实现可以对应。
在示范项目[@quick-qui/model-front](https://github.com/quickqui/model-front)中，可以发现 
<!-- TODO 补充特殊实现——exchange xxx-->