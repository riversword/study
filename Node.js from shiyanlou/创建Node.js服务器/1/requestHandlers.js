/*
//1.5
function start() {
    console.log("你正访问 /start");
}

function upload() {
    console.log("你正访问 /upload");
}

exports.start = start;
exports.upload = upload;
*/


//1.6
function start() {
    console.log("你正访问 /start");
    return "Hello Start";
}

function upload() {
    console.log("你正访问 /upload");
    return "Hello upload";
}

exports.start = start;
exports.upload = upload;