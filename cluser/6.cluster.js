var os = require('os');
var cluster = require('cluster');

if (cluster.isMaster) {
  cluster.fork();
  cluster.fork();

  console.log(cluster.workers);//对象，{"1": xxx, "2": xxx}包含所有的子进程

  // console.log(cluster.workers['1']);


} else {
  setInterval(()=>{
    console.log(process.pid);
  }, 2000);
}
