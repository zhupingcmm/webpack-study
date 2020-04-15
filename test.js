const webpack = require("webpack");

const config = require("./webpack.prod");

webpack(config,(err,stats)=>{
    // console.log("111")
    if(err){
    console.log("err")
     return console.log(err)
    }

    if(stats.hasErrors()){
        console.log("status has error")
        return console.log(stats.toString("errors-only"))
    }
    process.stdout.write(stats.toString({
        colors:true,
        modules:false,
        children:false,
        chunks:false,
        chunkModules:false
    }))
    // console.log("112")
    //console.log(stats)
})