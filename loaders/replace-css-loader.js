module.exports = function(resource){

    
    // const content = JSON.parse(resource);

    console.log(resource);

    // const content = resource.exec(/font-family\:.*(;?|\))/);

    // console.log(content);


    const content = /font-family\:.*(;?|\))/.exec(resource);
    console.log(content)


    // this.emitFile()
    this.callback(null,resource);
}