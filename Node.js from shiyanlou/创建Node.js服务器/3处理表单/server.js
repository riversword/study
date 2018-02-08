/*
//3.1
var http = require("http");
var url = require("url"); //引入node自带的url模块

function start( route, handle ){ //route函数,handle函数作参数传入
    function onRequest(require,response){
        //url的parse方法会解析请求地址，并返回一个对象，该对象中的pathname属性就是路径名称
        var pathname = url.parse(require.url).pathname;
        console.log("接收到"+ pathname +"的请求");

        var content = route( handle, pathname, response );
    }

    http.createServer(onRequest).listen(8888);
}

exports.start = start;
*/

/*
//3.2
var http = require("http");
var url = require("url"); //引入node自带的url模块

function start( route, handle ){ //route函数,handle函数作参数传入
    function onRequest(request,response){
        //url的parse方法会解析请求地址，并返回一个对象，该对象中的pathname属性就是路径名称
        var pathname = url.parse(request.url).pathname;
        var postData = "";

        request.setEncoding("utf8");
        request.addListener("data", function(postDataChunk){
            postData += postDataChunk;
            console.log("收到POST data chunk '" + postDataChunk + "'.");
        } );
        request.addListener("end", function(){
            route(handle, pathname, response, postData);
        });

        // console.log("接收到"+ pathname +"的请求");
        // var content = route( handle, pathname, response );
    }

    http.createServer(onRequest).listen(8888);
}

exports.start = start;
*/



//3.5
var http = require("http");
var url = require("url"); //引入node自带的url模块

function start( route, handle ){ //route函数,handle函数作参数传入
    function onRequest(request,response){
        //url的parse方法会解析请求地址，并返回一个对象，该对象中的pathname属性就是路径名称
        var pathname = url.parse(request.url).pathname;
        //var postData = "";

        console.log("接收到"+ pathname +"的请求");

        route(handle, pathname, response, request);

    }

    http.createServer(onRequest).listen(8888);
}

exports.start = start;