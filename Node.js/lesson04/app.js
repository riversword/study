//1.引入模块
var express = require('express');
var eventproxy = require('eventproxy');
var superagent = require('superagent');
var cheerio = require('cheerio');
var url = require('url');//url是Node.js标准库中已有的，不需要再安装


var app = express();//创建一个express实例

var cnodeUrl = 'https://cnodejs.org/';//待爬取的链接

//2.给路径/绑定一个处理函数
//app.get('/',function(req,res){

//var topicUrls = [];
//
superagent.get(cnodeUrl) //调用superagent的get方法请求cnodeUrl
.end(function(err,res){//请求结束时的回调函数
    if (err) {//请求错误时的处理
        return console.error(err);
    }
    
    var topicUrls = [];
    var $ = cheerio.load(res.text);//理解为将获取到的html节点赋值给$，可以用jQuery的语法从$中获取特定的元素

    //获取首页所有链接
    $("#topic_list .topic_title").each( function (idx,element) {
        var $element = $(element);
        //$element.attr('href') 的值为相对地址：/topic/542acd7d5d28233425538b04
        var href = url.resolve(cnodeUrl, $element.attr("href") );//判断出完整的地址
        topicUrls.push(href);
    } );

    console.log(topicUrls);



    var ep = new eventproxy();//创建一个eventproxy的实例

    //令ep重复监听 "topic_html" 事件 topicUrls.length次
    //after方法适合重复的操作，比如读取10个文件，调用5次数据库等。将回调函数handler注册到N次相同事件的触发上。达到指定的触发数，handler将会被调用执行，每次触发的数据，将会按触发顺序，存为数组作为参数传入。
    ep.after("topic_html", topicUrls.length, function (topics) {
        //参数topics的值为：[[topicUrl, res.text],[topicUrl, res.text],[topicUrl, res.text],[...],...]
        topics = topics.map(function (topicPair) {//.map()方法遍历元素 jQuery

            var topicUrl = topicPair[0];
            var topicHtml = topicPair[1];
            var $ = cheerio.load(topicHtml);
            return ({
                title: $(".topic_full_title").text().trim(),//$.trim() 函数用于去除字符串两端的空白字符 jQuery
                href: topicUrl,
                comment1: $(".reply_content").eq(0).text().trim(),
            });//此处返回的对象，为何要加小括号() ?

        });

        console.log("final:");
        console.log(topics);

    } );

    topicUrls.forEach(function (topicUrl) {
        superagent.get(topicUrl)
          .end(function (err, res) {
            console.log("fecth " + topicUrl + " successful");
            ep.emit("topic_html",[topicUrl, res.text]);
          });
    });



});



//});

//3.监听端口
 // app.listen('3000',function(){
 //    console.log("app运行在3000端口");
 // });