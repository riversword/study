/*
//3.1
var exec = require("child_process").exec;
var querystring = require("querystring");//解析html DOM

function start(response) {
    console.log("你正访问 /start");

    //var content = "Hello start";
    var body = '<html>' + '<head>' +
        '<meta http-equiv="Content-Type" content="text/html; ' +
        'charset=UTF-8" />' +
        '</head>' +
        '<body>' +
        '<form action="/upload" method="post">' +
        '<textarea name="text" rows="20" cols="60"></textarea>'+
        '<input type="submit" value="Submit text" />'+
        '</form>' +
        '</body>' +
        '</html>';

    response.writeHead(200,{"Content-Type":"text/html"});
    response.write(body);
    response.end();
}

function upload(response, postData) {
    console.log("你正访问 /upload");
    //return "Hello upload";
    response.writeHead(200,{"Content-Type":"text/plain"});
    response.write("你已经发送" + querystring.parse(postData).text );
    response.end();
}

exports.start = start;
exports.upload = upload;
*/


//3.3
var exec = require("child_process").exec;
var querystring = require("querystring");//解析html DOM
var fs = require("fs");

function start(response) {
    console.log("你正访问 /start");

    //var content = "Hello start";
    var body = '<html>' + '<head>' +
        '<meta http-equiv="Content-Type" content="text/html; ' +
        'charset=UTF-8" />' +
        '</head>' +
        '<body>' +
        '<form action="/upload" method="post">' +
        '<textarea name="text" rows="20" cols="60"></textarea>'+
        '<input type="submit" value="Submit text" />'+
        '</form>' +
        '</body>' +
        '</html>';

    response.writeHead(200,{"Content-Type":"text/html"});
    response.write(body);
    response.end();
}

function upload(response, postData) {
    console.log("你正访问 /upload");
    //return "Hello upload";
    response.writeHead(200,{"Content-Type":"text/plain"});
    response.write("你已经发送" + querystring.parse(postData).text );
    response.end();
}


function show(response){
    console.log("请求处理函数handle被调用");
    fs.readFile("./tmp/test.png", "binary", function(error, file){
        if(error){
            response.writeHead(500,{"Content-Type":"text/plain"});
            response.write(error + "\n");
            response.end();
        }else{
            response.writeHead(200,{"Content-Type":"image/png"});
            response.write(file, "binary"); //说明是二进制文件
            response.end();
        }
    });
}

exports.start = start;
exports.upload = upload;
exports.show = show;