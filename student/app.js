//express
var express = require('express');
var bodyParser = require('body-parser');
var app = express();

//cookieParser
var cookieParser = require('cookie-parser');
var session = require('express-session');

//redis
var redis = require('redis');
var client = redis.createClient({host: '127.0.0.1', port: 6379});

client.on('connect', function () {
  console.log('connect ok!');
});

client.on('error', function (err) {
  console.log('connect error', err);
});

//mongoose
var mongoose = require('mongoose');
var db = mongoose.connection;
var Schema = mongoose.Schema;

db.on('error', function(error) {
  console.log(error);
});

db.on('open', function() {
  console.log("connect ok!");
});

//使用中间件
app.use(express.static(__dirname + '/public'));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({extended: false}));

app.use(cookieParser());

//设置session
app.use(session({
  secret: 'hello',
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 60000,
    path: "/",
    httpOnly: true
  }
}));

//用户匹配
mongoose.connect("mongodb://fk:521@127.0.0.1/stus?authSource=admin", {useMongoClient: true});
var stuSchema = new Schema({username: String, pwd: String});
var Use = mongoose.model("One", stuSchema, 'users');

//添加学生信息
mongoose.Promise = global.Promise
var addStu = new Schema({stuname: String, stusex: String, stuage: String, stuscore: String});
var Add = mongoose.model("student", addStu, 'students');



//url
var options = {
  root: __dirname + "/public"
};

//请求登录页面
app.get('/', function(req, res) {

  client.hget(`sessionID:${req.sessionID}`, "id",function(err, reply){
    if (!err) {
      if (reply === req.sessionID) {
        res.status(200);
        res.redirect('/stu');
      } else {
        res.status(200);
        res.type('text/html');
        res.sendFile('/html/index.html', options);
      }
    } else {
      throw err;
    }
  })

});

//验证登录
app.post('/login', function(req, res) {

  Use.find({
    "username": req.body.username
  }, function(err, docs) {

    if (!err) {
      //查询对象是否存在
      if (docs[0]) {
        //密码是否正确
        if (docs[0].pwd == req.body.pwd) {
          res.status(200);
          res.json({status: 1});
          //保存session到redis
          client.hmset(`sessionID:${req.sessionID}`, "id", req.sessionID, function(err, reply){
            if (!err) {
              console.log("hmset reply = ", reply);//OK
            } else {
              throw err;
            }
          })

          client.expire(`sessionID:${req.sessionID}`, 60);
        } else {
          res.status(200);
          res.json({status: 3});
        }

      } else {
        res.status(200);
        res.json({status: 2});
      }
    } else {
      res.status(200);
      res.json({status: 0});
    }

  });

});

//学生页面
var options = {
  root: __dirname + "/public"
};
app.get('/stu', function(req, res) {
  client.hget(`sessionID:${req.sessionID}`, "id",function(err, reply){
    if (!err) {
      if (reply === req.sessionID) {
        res.status(200);
        res.sendFile('/html/stu.html', options);
      } else {
        res.status(200);
        res.type('text/html');
        res.redirect("/")
      }
    } else {
      throw err;
    }
  })
});

//请求添加学生信息
app.post('/add', function(req, res) {

  new Add({stuname: req.body.stuname, stusex: req.body.stusex, stuage: req.body.stuage, stuscore: req.body.stuscore}).save(function(err, data) {
    if (!err) {
      res.status(200);
      res.type('text/html');
      res.send('ok');
      console.log(data);
    } else {
      console.log(err);
    }
  });
});

//请求显示学生列表
app.post('/show', function(req, res) {
  //查找所有
  Add.find({}, function(err, docs) {
    if (!err) {
      res.status(200);
      res.send(docs)
    } else {
      console.log(err);
    }
  })
})

//请求删除学生信息
app.delete('/stu', function(req, res) {

  Add.remove({
    $or: [
      {
        stuname: req.body.dlstuname
      }, {
        stusex: req.body.dlstusex
      }, {
        stuage: req.body.dlstuage
      }, {
        stuscore: req.body.dlstuscore
      }
    ]
  }, function(err, docs) {
    if (!err) {
      console.log(docs.result);
      res.status(200);
      res.json({status: 1});
    } else {
      res.status(200);
      res.json({status: 0});
    }
  })
});

//请求查找学生
app.post('/fd', function(req, res) {

  Add.find({
    $or: [
      {
        stuname: req.body.fdstuname
      }, {
        stusex: req.body.fdstusex
      }, {
        stuage: req.body.fdstuage
      }, {
        stuscore: req.body.fdstuscore
      }
    ]
  }, function(err, docs) {
    if (!err) {
      console.log(docs);
      res.status(200);
      res.send(docs);
    } else {
      res.status(200);
      res.json({status: 0});
    }
  })
});

//请求修改学生信息
app.put('/stu', function(req, res) {

  Add.find({
    $or: [
      {
        stuname: req.body.fdxstuname
      }, {
        stusex: req.body.fdxstusex
      }, {
        stuage: req.body.fdxstuage
      }, {
        stuscore: req.body.fdxstuscore
      }
    ]
  }, function(err, docs) {
    if (!err) {
      console.log(docs);
      res.status(200);
      res.send(docs);
    } else {
      res.status(200);
      res.json({status: 0});
    }
  })
});

app.post('/re', function(req, res) {

  Add.update({
    stuname: req.body.findnm
  }, {
    $set: {
      stuname: req.body.restuname,
      stusex: req.body.restusex,
      stuage: req.body.restuage,
      stuscore: req.body.restuscore
    }
  }, function(err, docs) {
    if (!err) {
      console.log(docs);
      res.status(200);
      res.send(docs);
    } else {
      res.status(200);
      res.json({status: 0});
    }
  })
});

//请求注销
app.get('/logout',function(req, res){

  client.del(`sessionID:${req.sessionID}`, function(err, reply){
    if (!err){
      res.status(200);
      res.send("注销成功!!!");
    } else {
      throw err;
    }
  });

})

//请求注册
app.post('/signin', function(req, res) {

  Use.find({
    "username": req.body.sguser
  }, function(err, docs) {

    if (!err) {
      //查询对象是否存在
      if (docs[0]) {
        res.status(200);
        res.json({status: 2});
      } else {

        new Use({username: req.body.sguser, pwd: req.body.sgpaswd}).save(function(err, data) {
          if (!err) {
            res.status(200);
            res.json({status: 1});
          } else {
            console.log(err);
          }

        });
      }
    } else {
        console.log(err);
    }

  });

})



app.listen(8000, function() {
  console.log('listen 8000 ..... ');
})
