
var EventEmitter = require('events');

var eventOne = new EventEmitter();

eventOne.on("custom_event", function(){
  console.log("handler 1 .....");
});

eventOne.on('custom_event', function(){
  console.log("handler 2 .....");
});

//eventOne.listeners返回一个处理函数组成的数组
// console.log(eventOne.listeners('custom_event'));

eventOne.listeners('custom_event')[0]();
