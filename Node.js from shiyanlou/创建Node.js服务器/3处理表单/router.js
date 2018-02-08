
/*
//3.1
function route(handle, pathname,response){
    console.log("路由到"+ pathname +"的请求");
    if (typeof handle[pathname] === "function"){
        //return handle[pathname]();  //思考 handle函数中已经有return 为何函数前还要加一个return
        handle[pathname](response);
    } else {
        console.log("该路径没有处理函数");
        //return "404 not found"
        response.writeHead(200,{"Content-Type":"text/plain"});
        response.write("404 ont found");
        response.end();
    }
}
exports.route = route;
*/

/*
//3.2
function route(handle, pathname,response,postData){
    console.log("路由到"+ pathname +"的请求");
    if (typeof handle[pathname] === "function"){
        //return handle[pathname]();  //思考 handle函数中已经有return 为何函数前还要加一个return
        handle[pathname](response, postData);
    } else {
        console.log("该路径没有处理函数");
        //return "404 not found"
        response.writeHead(200,{"Content-Type":"text/plain"});
        response.write("404 ont found");
        response.end();
    }
}
exports.route = route;
*/

//3.5
function route(handle, pathname,response,request){
    console.log("路由到"+ pathname +"的请求");
    if (typeof handle[pathname] === "function"){
        //return handle[pathname]();  //思考 handle函数中已经有return 为何函数前还要加一个return
        handle[pathname](response, request);
    } else {
        console.log("该路径没有处理函数");
        //return "404 not found"
        response.writeHead(200,{"Content-Type":"text/plain"});
        response.write("404 ont found");
        response.end();
    }
}
exports.route = route;