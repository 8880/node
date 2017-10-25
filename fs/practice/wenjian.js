var fs = require("fs");

function eh (path){

  fs.readdir(path, function(err, files){
    if (!err) {
      files.forEach(function(current){
        var nph = `${path}/${current}`

        fs.stat(nph, function(err, stat){

          if (stat.isFile()){
            console.log(current);
          } else if (stat.isDirectory()){
              eh(nph)
          } else {
            console.log("其他文件类型");
          }
        });

      });
    }
  });
};


eh('../../..')

// 封装函数： 遍历一个目录，并且将所有子目录中的所有文件名都输出
