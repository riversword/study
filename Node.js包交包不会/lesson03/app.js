var express = require('express');
var superagent = require('superagent');
var cheerio = require('cheerio');

var app = express();
 app.get('/', function(req, res, next){
    //用superagent抓取https://cnodejs.org/ 的内容
    superagent.get('https://cnodejs.org/')
    .end(function(err, sres){
        //处理常规错误
        if(err){
            return next(err);
        }

        var $ = cheerio.load(sres.text);
        //sres.text里面存储着网页的HTML内容,将他传递给cheerio.load之后就可以得到一个实现了jquery接口的变量，习惯地命名为$

        var items = [];
        $('#topic_list .topic_title').each(function (idx, element){
            var $element = $(element);
            items.push({
                title: $element.attr('title'),
                href: $element.attr('href')
            });
        });

        res.send(items);
    });
 });

 app.listen('3000',function(){
    console.log("app运行在3000端口");
 });