

//立即定时器, 插队执行, 默认执行一次
var id = setImmediate(function(value){
  console.log("setImmediate: ", value);
}, 100);

console.log(id);
console.log("after setImmediate...");
