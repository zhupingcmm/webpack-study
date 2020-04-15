# 研究webpack 
## 分析
###初级分析
stats: 构建的统计信息

在package.json中使用stats

  ```
    "script":{
      "build:stats":"webpack --env production --json >stats.json"
    }
  ```

###构建速度的分析
使用 speed-measure-webpack-plugin

    
        const smp = new SpeedMeasurePlugin();       
        const webpackConfig = smp.wrap({
        plugins: [
            new MyPlugin(),
            new MyOtherPlugin()
        ]
        });
    

### 构建体积的分析
 使用 webpack-bundle-analyzer
 
     module.exports = {
         plugins: [
             new BundleAnalyzerPlugin()
         ]
     }
 

##优化:
### css 优化
   * 1.1 檫除无用的css代码
   
       PurifyCSS:遍历代码，识别已经用到的css class
       
       使用 purgecss-webpack-plugin 和 mini-css-extract-plugin配合使用
        * 1.1.1 定义常量
        
            const PATHS ={src: path.join(__dirname, 'src')}

        * 1.1.2 在plugins 数组中添加
        
        new MiniCssExtractPlugin({
            filename:'[name]_[contenthash:8].css'
        }),
        
        //檫除无用的css样式
        
        new PurgecssPlugin({
            paths: glob.sync(`${PATHS.src}/**/*`,  { nodir: true }),
        }),
        
   * 2.1 css 代码压缩
 
       使用optimize-css-assets-webpack-plugin
       
         new OptimizeCSSAssetsPlugin({
            assetNameRegExp: /\.css$/g,
            cssProcessor: require("cssnano")})

### 构建速度优化

* 1.1 多进程/多实例构建: 资源并行解析可选方案

  thread-loader 官方推荐
        
  parallel-webpack
  
  HappyPack 作者不维护了

* 1.2多进程/多实例： 并行压缩

  terser-webpack-plugin 开启parallel 参数
  
* 1.3 缓存

    目的： 提升二次构建速度
    
    缓存思路：
     
     * 1.3.1 babel-loader 开启缓存
      
      {
          loader: "babel-loader",
          options:{
            cacheDirectory: true
          }
      }
       
     * 1.3.2 terser-webpack-plugin 开启缓存
  
      optimization: {
      minimize: true,
      minimizer: [
        new TerserPlugin({
          cache: true,
        }),
          ]},
          
     * 1.3.3 使用 cache-loader 或者 hard-source-webpack-plugin
* 1.4 缩小构建目标

     目的：尽可能的少构建模块
      
     * 1.4.1 比如babel-loader 不解析node_module
      
      module.exports ={
          rules: {
              test: /\.js$/,
              loader: "babel-loader",
              exclude : 'node_modules'
          }
      }
      
     * 1.4.2 减少文件搜索范围
      
     * 1.4.3 优化 resolve.modules 配置(减少模块搜索层级)
      
     * 1.4.4 优化 resolve.mainFields 配置
      
     * 1.4.5 优化 resolve.extensions 配置
      
     * 1.4.6 合理使用 alias
      
      moudle.exports={
          resolve:{
              alias:{
                  react: path.resolve(__dirname, './node_modules/react/dist/react.min.js')
              },
              modules: [path.resolve(__dirname, 'node_modules')],
              extensions: ['js'],
              mainFields: ['main']
          }
      }     

### 构建体积优化
#### 分包
* 1.1 设置Externals:

    思路：将React reactdom 基础包通过cdn的方式引入，不打bundle中
    
    方法：使用html-webpack-external-plugin
    
    不足之处：一个基础包就需要一个cdn
    
* 1.2 splitChunks

* 1.3 预编译资源模块

    思路： 将react react-dom redux react-redux 基础包和业务包打成一个文件
    
    方法： 使用DLLPlugin进行分包，DllReferencePlugin 对mainfast.json引用

    * 1.3.1 编写一个全新的webpack config file
     
      利用 webpack.DllPlugin 对基础包进行打包
      
    * 1.3.2 在webpack config file 中引用刚才打包的文件
    
      配置 webpack.DllReferencePlugin 引用 刚才打出来的包
      
    * 1.3.3 利用 add-asset-html-webpack-plugin 添加 刚才打出来的js到HTML文件中

#### 图片压缩

要求：基于Node库的imagemin或者tinypng API

使用：配置image-webpack-loader



