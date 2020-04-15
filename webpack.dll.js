const path = require("path");
const webpack = require("webpack");
module.exports={
    entry:{
        library:[
            'react',
            'react-dom'
        ]
    },
    mode:'production',
    output: {
        filename: '[name]_[hash].dll.js',
        path: path.join(__dirname, 'build/library'),
        library: '[name]_[hash]'
    },
    plugins:[
        new webpack.DllPlugin({
            name:'[name]_[hash]',
            path: path.join(__dirname, 'build/library/[name].json')
        })
    ],
    optimization:{
        minimize:true
    }
}