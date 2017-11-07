
var mongoose = require('mongoose');
var db = mongoose.connection;

db.on('error', function (error) {
  console.log(error);
});

db.on('open', function () {
  console.log("connect ok!");
});


mongoose.connect("mongodb://fk:521@127.0.0.1/stus?authSource=admin", {useMongoClient: true});



var Schema = mongoose.Schema;

//创建一个Schema
var stuSchema = new Schema({
  username: String,
  pwd: Number,
});

//创建model
var StuOne = mongoose.model("One", stuSchema, 'users');


//数据的查找
// StuOne.find({gender: 0}, { name: 1, age: 1}, {sort: {age: 1}}, function(err, docs){
//   if (!err){
//     console.log(docs);//数组
//   } else {
//     console.log(err);
//   }
//
//   db.close();
// });

StuOne.find({"username":"fk1"}, null,  function(err, docs){


    if (!err){
      console.log(typeof docs[0]);
      console.log(Boolean(docs[0]));//数组
  // console.log(docs[0].username);//数组
      if(!docs){console.log('12121')}else{    console.log('1111')};


  } else {
    console.log('222');
  }

  db.close();
});
