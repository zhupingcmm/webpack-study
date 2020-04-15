const path = require("path");
const {CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
module.exports={
    entry:{
        index:"./src/index.js",
    },
    output:{
        path:__dirname+"/dist",
        filename:"[name]_[hash:8].js"
    },
    mode:"development",
    // mode:"production",
    module:{
        rules:[
            {
                test:/\.js$/,
                use:"babel-loader"
            },
            {
                test:/\.scss$/,
                use:[
                    MiniCssExtractPlugin.loader,
                    // "style-loader",
                    "css-loader",
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
        new HtmlWebpackPlugin({
            filename:'index.html',
            template:'./src/index.html'
        }),
        new webpack.HotModuleReplacementPlugin(),
        new MiniCssExtractPlugin({
            filename:'[name]_[contenthash:8].css'
        }),
        new webpack.DllReferencePlugin({
            manifest:require("./build/library/library.json")
        }),
        new AddAssetHtmlPlugin({
            filepath: path.resolve(__dirname, 'build/library/*.dll.js'),
        }),
    ],
    devServer:{
        contentBase:__dirname + "/dist",
        port:9001,
        open:true,
        hot:true
    }
}