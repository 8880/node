var fs = require('fs');
var http = require('http');
var url = require('url');

http.createServer(function(req, res){
  //req.url(新版本)
  var myURL = url.parse(req.url, true);//旧版本

  if (myURL.pathname === '/') {
    //发送给用户一个html页面
    fs.readFile('./test.html', 'utf8', function(err, data){
      if (!err) {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end(data);
      }
    });
  } else if (myURL.pathname === '/stu' && req.method === 'POST') {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end('<h1>submit OK!</h1>')
  } else if (myURL.pathname === '/test.css' && req.method === 'GET') {
    fs.readFile('./test.css', 'utf8', function(err, data){
      if (!err) {
        res.writeHead(200, {'Content-Type': 'text/css'});
        res.end(data);
      }
    });
  }
  else {
    res.writeHead(404, {'Content-Type': 'text/html'});
    res.end('<h1>Not Found!</h1>');
  }

}).listen(8000, function(){
  console.log('listen 8000 ....');
});
