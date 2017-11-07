var os = require('os');
var cluster = require('cluster');
var w = [];

if (cluster.isMaster) {

  for (var i = 0, n = os.cpus().length; i < n; i++) {

    var worker = cluster.fork();
      w.push(worker);
  }

  // console.log(w);


} else {
  setInterval(()=>{
    console.log(w[1]);

  }, 1000)
}

// console.log(w);
