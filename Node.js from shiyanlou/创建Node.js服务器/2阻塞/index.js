//2.1
var server = require("./server"); 
var router = require("./router");

var requestHandlers = require("./requestHandlers");
var handle = {};
handle["/"] = requestHandlers.start;
handle["/start"] = requestHandlers.start;
handle["/upload"] = requestHandlers.upload;

server.start( router.route, handle ); //注意是取模块中的方法，执行