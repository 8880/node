
## redis 密码
```

开启服务端 cd redis/src ./redis-server
开启客户端 cd redis/src ./redis-cli
src/redis-server  ./redis.conf 带密码


windows: redis.windows.conf
linux:  redis.conf   

requirepass 密码


连接指定密码：  redis-cli  -a  密码


expire key seconds  指定让一个key过期删除


局部安装redis npm install redis -S
```
