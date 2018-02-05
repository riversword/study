//1.0
/*
var http = require("http"); //引入HTTP模块

//利用http模块中的createServer方法创建一个server，createServer会返回一个对象，用.listen获取到该对象中的listen方法。
//将匿名函数function(request, response)作为参数传入createServer方法，同时该匿名函数也接受两个参数
http.createServer( function(request, response) {
    response.writeHead(200, {"Content-Type":"text/plain"}); //发送HTTP状态码200（表示请求成功）和HTTP头的内容类型（content-type）
    response.write("Hello World"); //在http主体中发送文本Hello World
    response.end(); //完成响应
} ).listen(8888);
*/


//1.1 单独定义匿名函数，再传入。代码逻辑更清晰
/*
var http = require("http");
function onRequest(request, response) {
    response.write(200, {"Content-Type": "text/plain"});
    response.write("Hello World");
    response.end();
}
http.createServer( onRequest ).listen(8888);
*/


/*
//1.2 类似于开通用 require("http") 引入http模块，尝试将 server.js 封装成一个模块
var http = require("http");
function start(){
    function onRequest(require, response) {
        response.writeHead(200,{"Content-Type": "text/plain"});
        response.write("Hello World By start");
        response.end();
    }
    http.createServer(onRequest).listen(8888);
    console.log("服务器已启动");
}
//start(); //测试，不要这条执行代码，server.js也能正常输出
exports.start = start; //作为模块导出
*/

/*
//1.3 路由，根据不同的请求返回相应的结果
var http = require("http");
var url = require("url"); //引入node自带的url模块

function start(){
    function onRequest(require,response){
        //url的parse方法会解析请求地址，并返回一个对象，该对象中的pathname属性就是路径名称
        var pathname = url.parse(require.url).pathname;
        console.log("接收到"+ pathname +"的请求");

        response.writeHead(200, {"Content-Type": "text/plain"});
        response.write("Hello World");
        response.end();
    }

    http.createServer(onRequest).listen(8888);
}

exports.start = start;

//执行结果："接收到"+ pathname +"的请求"，  "接收到/favicon.ico的请求"
*/

/*
//1.4 路由
var http = require("http");
var url = require("url"); //引入node自带的url模块

function start( route ){ //route函数作参数传入
    function onRequest(require,response){
        //url的parse方法会解析请求地址，并返回一个对象，该对象中的pathname属性就是路径名称
        var pathname = url.parse(require.url).pathname;
        route( pathname );

        console.log("接收到"+ pathname +"的请求");
        response.writeHead(200, {"Content-Type": "text/plain"});
        response.write("Hello World");
        response.end();
    }

    http.createServer(onRequest).listen(8888);
}

exports.start = start;
*/


//1.5
var http = require("http");
var url = require("url"); //引入node自带的url模块

function start( route, handle ){ //route函数,handle函数作参数传入
    function onRequest(require,response){
        //url的parse方法会解析请求地址，并返回一个对象，该对象中的pathname属性就是路径名称
        var pathname = url.parse(require.url).pathname;
        route( handle, pathname );

        console.log("接收到"+ pathname +"的请求");
        response.writeHead(200, {"Content-Type": "text/plain"});
        response.write("Hello World");
        response.end();
    }

    http.createServer(onRequest).listen(8888);
}

exports.start = start;




//1.6
var http = require("http");
var url = require("url"); //引入node自带的url模块

function start( route, handle ){ //route函数,handle函数作参数传入
    function onRequest(require,response){
        //url的parse方法会解析请求地址，并返回一个对象，该对象中的pathname属性就是路径名称
        var pathname = url.parse(require.url).pathname;
        console.log("接收到"+ pathname +"的请求");
        response.writeHead(200, {"Content-Type": "text/plain"});

        var content = route( handle, pathname );
        response.write(content);

        response.end();
    }

    http.createServer(onRequest).listen(8888);
}

exports.start = start;