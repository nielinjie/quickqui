# 动机和策略

quick-qui 希望解决的是需求规模大、复杂性高、变化快，帮助用户实现快速反馈，持续迭代。

quick-qui 解决问题的办法是 -

1. 模型与实现相分离。
2. 模型的重用、组合。
3. 模型的自定义、可扩展。
4. 实现的可重用、可组合、可扩展。
5. 支持实现的多样性。
6. 模型和实现机制与技术无关。

## 模型与实现分离

模型的变化节奏和因素，跟实现不一样。比如当业务和需求变化时，是业务模型变化，而实现并不变化。模型与实现分离可以显著提高开发者对变化的关注聚焦。

## 模型的重用和组合

模型有很大的重用价值。通过构建可重用的模型组件，可以有效提高应对复杂性和可变性的能力。模型的重用方式一般是组合。

## 模型的自定义、可扩展

模型可能有很多抽象层次和关注视角。一个系统中可能（几乎一定）有多种不同的和相互关联的模型。@quick-qui 机制允许自定义模型。并提供模型间相互影响的机制。

## 实现的可重用、可组合、可扩展

实现的模块化决定了可重用、可组合可扩展。quick-qui 机制不介入实现的模块化。实现依赖与所使用的技术进行模块化。比如 nodejs 技术栈借助 npm 之类的模块化和依赖管理方案。

## 支持实现的多样性

对模型的实现可以有多种，并且各种实现可以同时存在。

## 模型和实现机制与技术无关

模型和实现的机制与技术无关。由于实现多样性的支持，模型和实现可以运行在不同的环境和技术栈。
（🏃🏻 设计如此，目前是否已经达成还需验证。）
