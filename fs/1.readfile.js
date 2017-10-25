//require是nodejs的全局函数,用于引入其他模块

var fs = require("fs"); //filesystem

//异步读取
//不写编码格式，默认将内存数据以16进制输出
fs.readFile("../nvm.md", "utf8", function(err, data){
  //回调函数, 只有文件读取结束,才会执行
  //没有错误时， err === null
  if (!err){
    console.log("readFile 读取的内容为： ", data);
  }
});

/*
//同步读取
var data = fs.readFileSync("./mvd.js", "utf8");
console.log(data);
*/


/*
//readlink需要注意，和操作系统有关系,linux读取到的是原文件名
fs.readlink("./01.fs.link.lnk", "utf8", function (err, data){
  //没有错误时， err === null
  console.log(err);

  if (!err){
    console.log("readlink 读取的内容为： ", data);
  }
});
*/

/*readFile 只能读取普通文件 目录不是文件*/
fs.readFile(".", function(err, data){
  console.log("readFile 错误", err);
  console.log("readFile读取目录： ", data);
});


console.log("after fs.readFile....");
