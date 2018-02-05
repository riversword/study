/*
//1.2 在入口文件中来启动server
var server = require("./server"); //引入当前目录下名为server的文件 注意路径的写法
server.start(); //执行server中的start方法
*/

/*
//1.4 
var server = require("./server"); 
var router = require("./router");
server.start( router.route ); //注意是取模块中的方法，执行
*/

//1.5
var server = require("./server"); 
var router = require("./router");

var requestHandlers = require("./requestHandlers");
var handle = {};
handle["/"] = requestHandlers.start;
handle["/start"] = requestHandlers.start;
handle["/upload"] = requestHandlers.upload;

server.start( router.route, handle ); //注意是取模块中的方法，执行