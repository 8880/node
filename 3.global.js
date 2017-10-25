
console.log("__dirname =", __dirname); //所在文件路径
console.log("__filename =", __filename); //该文件路径

//引入其他代码
require('./test.js');

//定义在global上才是全局变量，可以在任何模块内使用
console.log(global.value);
console.log(value);


//此处的a  只能在当前代码内使用，不算全局变量
var a = 100;
