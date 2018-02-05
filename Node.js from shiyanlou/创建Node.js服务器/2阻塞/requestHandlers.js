
/*
//2.1
function start() {
    console.log("你正访问 /start");

    function sleep(millSeconds) {
        var startTime = new Date().getTime();
        while ( new Date().getTime() < startTime + millSeconds ); //为真则继续判断
    }

    sleep(10000);

    return "Hello Start";
}

function upload() {
    console.log("你正访问 /upload");
    return "Hello upload";
}

exports.start = start;
exports.upload = upload;
*/


//2.2
var exec = require("child_process").exec;

function start() {
    console.log("你正访问 /start");

    var content = "empty";
    exec("ls -lah", function(error, stdout, stderr) {
        content = stdout;
    });//ls-lah命令 获取当前目录下所有的文件 将结果赋值给content，并返回content

    /*function sleep(millSeconds) {
        var startTime = new Date().getTime();
        while ( new Date().getTime() < startTime + millSeconds ); //为真则继续判断
    }

    sleep(10000);

    return "Hello Start";*/
}

function upload() {
    console.log("你正访问 /upload");
    return "Hello upload";
}

exports.start = start;
exports.upload = upload;