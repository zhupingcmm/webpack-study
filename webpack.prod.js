const path = require("path");
const {CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const PurgecssPlugin = require("purgecss-webpack-plugin");
const glob = require('glob');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const TerserPlugin = require("terser-webpack-plugin");
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
const HardSourceWebpackPlugin = require("hard-source-webpack-plugin");

const PATHS ={
    src: path.join(__dirname, 'src')
}
const smp = new SpeedMeasurePlugin();
module.exports={
    entry:{
        index:"./src/index.js"
    },
    output:{
        path:__dirname+"/dist",
        filename:"[name]_[hash:8].js"
    },
    // mode:"development",
    mode:"production",
    module:{
        rules:[
            {
                test:/\.js$/,
                use:[
                    {
                        //多实例多进程构建
                        loader:"thread-loader",
                        options:{
                            works:3
                        }
                    },
                    {
                        loader:  "babel-loader",
                        options: {
                            cacheDirectory: true
                        }
                    }
                   
                ]
            },
            {
                test:/\.scss$/,
                use:[
                    
                    MiniCssExtractPlugin.loader,
                   
                    // "style-loader",
                    "css-loader",
                    path.resolve('./loaders/replace-css-loader.js'),
                    'sass-loader'
                ]    
            },
            {
                test:/\.(jpg|svg,jpeg)$/,
                use:{
                    loader:"url-loader",
                    options:{
                        limit:1024 * 10,
                        name:'img/[name]_[hash:8].[ext]'
                    }
                }
            }
        ]
    },
    plugins:[
        new CleanWebpackPlugin(),
        //打包html文件
        new HtmlWebpackPlugin({
            filename:'index.html',
            template:'./src/index.html'
        }),
        new webpack.HotModuleReplacementPlugin(),
        //把css样式从js文件中分离出来
        new MiniCssExtractPlugin({
            filename:'[name]_[contenthash:8].css'
        }),
        //檫除无用的css样式
        new PurgecssPlugin({
            paths: glob.sync(`${PATHS.src}/**/*`,  { nodir: true }),
        }),
        //压缩Css 代码
        new OptimizeCSSAssetsPlugin({
            assetNameRegExp: /\.css$/g,
            cssProcessor: require("cssnano")
        }),
        //代码体积分析
        // new BundleAnalyzerPlugin()

        //引用打包代码
        new webpack.DllReferencePlugin({
            manifest:require("./build/library/library.json")
        }),
        new AddAssetHtmlPlugin({
            filepath: path.resolve(__dirname, 'build/library/*.dll.js'),
        }),
        //模块缓存
        // new HardSourceWebpackPlugin()
    ],
    optimization:{
        minimize: true,
        //代码并行压缩
        minimizer: [
          new TerserPlugin({
              cache: true,
              parallel: true,
          }),
        ],
    }
}