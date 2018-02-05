/*
//1.4
function route(pathname){
    console.log("路由到"+ pathname +"的请求");
}
exports.route = route;
*/


/*
//1.5
function route(handle, pathname){
    console.log("路由到"+ pathname +"的请求");
    if (typeof handle[pathname] === "function"){
        handle[pathname]();
    } else {
        console.log("该路径没有处理函数")
    }
}
exports.route = route;
*/


//1.6
function route(handle, pathname){
    console.log("路由到"+ pathname +"的请求");
    if (typeof handle[pathname] === "function"){
        return handle[pathname]();  //思考 handle函数中已经有return 为何函数前还要加一个return
    } else {
        console.log("该路径没有处理函数");
        return "404 not found"
    }
}
exports.route = route;