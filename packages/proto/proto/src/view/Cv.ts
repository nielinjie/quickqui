import  ChartCardView  from "@quick-qui/front-chart/dist/ChartCardView";
//MARK 需要继续研究， 动态import如何直接import node_modules里面的模块。目前只有采用这个间接的方式。可能跟webpack的机制有关。
//MARK  这个方法也有好处，如果直接动态应用node_modules里面的东西，webpack会打包整个node_modules目录。
// export const view= ChartCardView;
export default ChartCardView
//FIXME 不知道为啥在这里运行不了，在model-front可以运行。model-front是的tsconfig-model=es6， 但这里没办法，以为app-server运行在node里面，es6引起其他bug。先搁置一下。