// let str ='.search-box{background-color:red;font-family:"Courier New"}.unUse{font-family:fantasy;font-size:300px}.test{font-size:22px}a{clear:both}span{color:0}';

// let content ;
// while((content = /font-family\:/.exec(str)) !==null){
//     console.log(content);
// }


// const regex1 = /font\-family\:.+?(\;|\})/gi;
const regex1 = /font\-family\:.+?(\;|\})/gi;

// RegExp('font-family\:.+?(\;|\})$*', 'gi');
const str1 = '.search-box{background-color:red;font-family:"Courier New"}.unUse{font-family:fantasy;font-size:300px}.test{font-size:22px}a{clear:both}span{color:0}';
let array1;

while ((array1 = regex1.exec(str1)) !== null) {
//   console.log(`Found ${array1[0]}. Next starts at ${regex1.lastIndex}.`);
  console.log(array1[0]);
  let tempArr = array1[0].split('');

  let fontFamilyValue = '';

  for(let i = 12; i< tempArr.length; i++){
      if(tempArr[i] === "}" || tempArr[i] === ";") break;
      fontFamilyValue = fontFamilyValue + tempArr[i];
  }

  console.log(fontFamilyValue)
//   console.log(tempArr);
  // expected output: "Found foo. Next starts at 9."
  // expected output: "Found foo. Next starts at 19."
}