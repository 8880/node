var fs = require('fs');
var socketIO = require('socket.io');
var url = require('url');
var http = require('http');
var inputname;

var server = http.createServer(function(req, res) {

  var myURL = url.parse(req.url);

  if (myURL.pathname === '/' && req.method === 'GET') {
    fs.readFile('./login.html', 'utf8', function(err, data) {
      if (!err) {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end(data);
      } else {
        res.writeHead(500, {'Content-Type': 'text/html'});
        res.end("<h1>server inner error!</h1>");
      }
    });
  } else if (myURL.pathname === '/ind' && req.method === 'GET') {


    inputname = myURL.search.slice(myURL.search.lastIndexOf('=')+1);

    fs.readFile('./index.html', 'utf8', function(err, data) {
      if (!err) {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end(data);
      }
    })
  } else if (myURL.pathname === '/index' && req.method === 'GET') {

    fs.readFile('./index.html', 'utf8', function(err, data) {
      if (!err) {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end(data);
      }
    })
  } else {
    res.writeHead(404, {'Content-Type': 'text/html'});
    res.end("<h1>not Found!</h1>");
  }
})

server.listen(8000, function() {
  console.log('监听 8000 .... ');
});

var io = socketIO(server);

io.on('connection', function(socket) {

  var username = inputname;
  console.log(username);

  io.sockets.emit('user connect', `${username}上线了`);
  socket.emit('server message', username);

  //断开触发
  socket.on('disconnect', function() {
    console.log(`客户端 ${username}断开连接`);
    io.sockets.emit('user disconnect', `${username}退出了`);
  });

  socket.on("client message", function(data, fn) {
    console.log(`来自客户端${username}的数据: ${data}`);

    io.sockets.emit('user2 connect', `${username} : ${data}`);

  });
  })
