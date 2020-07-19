module.exports = function(resource){

    let stack = [];
    let array1;
    const regex1 = /font\-family\:.+?(\;|\})/gi;
    while ((array1 = regex1.exec(resource)) !== null) {
        //   console.log(`Found ${array1[0]}. Next starts at ${regex1.lastIndex}.`);
          console.log(array1[0]);
          let tempArr = array1[0].split('');
        
          let fontFamilyValue = '';
        
          for(let i = 12; i< tempArr.length; i++){
              if(tempArr[i] === "}" || tempArr[i] === ";") break;
              fontFamilyValue = fontFamilyValue + tempArr[i];
          }
        
          stack.push(fontFamilyValue);
    };

    let content = resource;
    for(let i = 0 ; i< stack.length; i++){
        content = content.replace(stack[i], 'zp')
    }


    // this.emitFile()
    this.callback(null,content);
}