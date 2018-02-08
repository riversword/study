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

/*
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
*/

/*
//3.4
var exec = require("child_process").exec;
var querystring = require("querystring");//解析html DOM
var fs = require("fs");

function start(response) {
    console.log("你正访问 /start");

    //var content = "Hello start";
    var body = '<html>' + 
        '<head>' +
        '<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />' +
        '</head>' +
        '<body>' +
        '<form action="/upload" enctype="multipart/form-data" method="post">' +
        '<input type="file" name="upload">'+
        '<input type="submit" value="上传文件" />'+
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
*/


//3.4
var exec = require("child_process").exec;
var querystring = require("querystring");//解析html DOM
var fs = require("fs");
var formidable = require("./formidable");

function start(response) {
    console.log("你正访问 /start");

    //var content = "Hello start";
    var body = '<html>' + 
        '<head>' +
        '<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />' +
        '</head>' +
        '<body>' +
        '<form action="/upload" enctype="multipart/form-data" method="post">' +
        '<input type="file" name="upload">'+
        '<input type="submit" value="上传文件" />'+
        '</form>' +
        '</body>' +
        '</html>';

    response.writeHead(200,{"Content-Type":"text/html"});
    response.write(body);
    response.end();
}

function upload(response, request) {
    var form = new formidable.IncomingForm(); //实例化
    console.log("about to parse");
    form.uploadDir = "tmp"; //指定上传目录

    form.parse(request, function(error, fields, files){
        //parse负责解析文件
        console.log("parsing done");
        fs.renameSync(files.upload.path, "./tmp/test.png"); //fs模块的rename进行重命名
    });

    console.log("你正访问 /upload");
    //return "Hello upload";
    response.writeHead(200,{"Content-Type":"text/html"});
    response.write("收到图片 <br/>");
    response.write("<img src='/show' />"); //yongimg标签来显示图片，show方法会返回一张图片
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