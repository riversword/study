
//引入依赖
var express = require('express');
var utility = require('utility');

var app = express();//建立一个实例

app.get('/', function(req, res){
    var q = req.query.q; //从req.query中获取q的参数

    var sha1Value = utility.sha1(q);

    res.send(sha1Value);
});

app.listen('3000', function(){
    console.log("app 运行在3000端口");
});