/*
//2.1
var http = require("http");
var url = require("url"); //引入node自带的url模块

function start( route, handle ){ //route函数,handle函数作参数传入
    function onRequest(require,response){
        //url的parse方法会解析请求地址，并返回一个对象，该对象中的pathname属性就是路径名称
        var pathname = url.parse(require.url).pathname;
        console.log("接收到"+ pathname +"的请求");

        var content = route( handle, pathname );

        response.writeHead(200, {"Content-Type": "text/plain"});
        response.write(content);
        response.end();
    }

    http.createServer(onRequest).listen(8888);
}

exports.start = start;
*/


//2.3
var http = require("http");
var url = require("url"); //引入node自带的url模块

function start( route, handle ){ //route函数,handle函数作参数传入
    function onRequest(require,response){
        //url的parse方法会解析请求地址，并返回一个对象，该对象中的pathname属性就是路径名称
        var pathname = url.parse(require.url).pathname;
        console.log("接收到"+ pathname +"的请求");

        var content = route( handle, pathname, response );
        /*
        response.writeHead(200, {"Content-Type": "text/plain"});
        response.write(content);
        response.end(); */
    }

    http.createServer(onRequest).listen(8888);
}

exports.start = start;