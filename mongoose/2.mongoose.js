var mongoose = require('mongoose');
var db = mongoose.connection;

//解决提示更新问题
mongoose.Promise = global.Promise;

db.on('error', function(error){
  console.log('connect error', error);
});

db.on('open', function(){
  console.log('connect ok');
});

//stus为创建的数据库
mongoose.connect('mongodb://fk:521@127.0.0.1/stus?authSource=admin', {useMongoClient: true});

/************开始操作数据库************************/

//创建一个Schema
var Schema = mongoose.Schema;

//创建了一个表示用于信息的Schema
var stuSchema = new Schema({name: String, age: Number, gender: Number});

//创建一个Model
/* 其中的 “One”不是创建的集合的名字，集合名字是 "ones"
对StuOne进行操作，就是操作该集合 */
var StuOne = mongoose.model("One", stuSchema);

//创建一个Entity , 一个文档

// 创建一个文档，并且插入到该集合中即可
new StuOne({name: '李四', age: 60, gender: 0}).save(function(err, data){
  if (!err) {
    console.log('insert OK!', data);
  } else {
    console.log(err);
  }


//关闭数据库连接
// db.close();
mongoose.disconnect();
});
