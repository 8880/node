//process 代表当前进程

console.log(process.argv); //拿到命令行参数,是一个数组

process.argv.forEach(function(value, index){
  // console.log("index =" + index  +  "  value = " + value);

  //${name}  直接去变量name的值
  console.log(`index=${index}  value=${value}`);//模板字符串
});
