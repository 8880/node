
//on注册事件

//正常退出,会触发. 如果手动调用process.exit(), 那么不会触发
process.on('beforeExit', function(code){
  console.log("beforeExit: ", code);
  console.log('正常退出');
});

//只要退出，都会触发
process.on('exit', function(code){
  console.log("exit: ", code);
});


for (var i = 0; i < 1500; i++) {
  console.log(i);
}

// process.exit(0);
