const HtmlWebpackPlugin = require('html-webpack-plugin');
const glob = require('glob');
const path = require('path');

const setSMA = () => {
    const entry={};
    const htmlWebpackPlugins = [];
    let entryFiles = glob.sync(path.join(__dirname,'/src/*/index.js'));
    for(let item of entryFiles){
        const match = item.match(/src\/(.*)\/index.js/);
        const pageName = match && match[1];
        entry[pageName] = path.join(__dirname,`./src/${pageName}/index.js`);

        htmlWebpackPlugins.push(new HtmlWebpackPlugin({
            filename:`${pageName}.html`,
            template:path.join(__dirname,`./src/${pageName}/index.html`)
        }))

    }

    return {
        entry,
        htmlWebpackPlugins
    }
}

module.exports={
    setSMA
}

// const {entry, htmlWebpackPlugins} = setSMA();