# 创建Node.js服务器 1

一个简单的服务器，需要满足两个条件：

1. 接收请求

2. 作出响应


新建一个server.js文件，代码内容如下：

```js
var http = require("http");
http.createServer( function(request, response){
  response.writeHead(200,{"Content-Type":"text/plain"});
  response.write("Hello World");
  response.end();
} ).listen(8888);
```

在该文件目录中执行`node server.js`命令，然后在浏览器中访问`http://localhost:8888/` ，就能看到打印出的`Hello World`。

代码解析：

`var http = require("http");` 引入nodejs的http模块，引用的目的是为使用它的`createServer`方法。

`createServer`方法会返回一个对象，该对象有一个`listen`函数（方法），用于监听端口号，它接受一个参数，即端口号。

在`createServer`方法中，传入一个函数，该函数接受两个参数`request`和`response`，`response`负责收到请求后作出响应：

```
response.writeHead(200, {"Content-Type": "text/plain"});
response.write("Hello World");
response.end();
```

首先，使用`response.writeHead()` 函数发送一个HTTP状态 200 和 HTTP头的内容类型（content-type），分别表示请求成功和需要返回的text类型

然后使用 response.write() 函数在HTTP相应主体中发送文本Hello World，也就是需要显示的文本。

最后就是调用 response.end() 完成响应过程。

## 代码模块化

在nodejs中，很多代码都是模块化的，就像我们上面在第一行`var http = require("http");`中的http模块一样，所以接下来首先来模块化我们的代码。

在这个代码片段之中，给`createServer`传入的是一个匿名函数，代码可读性到后来可能就没有那么好了，可以写成这样：

```js
var http = require("http");
function onRequest(request, response) {
	response.writeHead(200, {"Content-Type": "text/plain"});
	response.write("Hello World");
	response.end();
}
http.createServer(onRequest).listen(8888);
```

上面的代码中，我们创建了一个`onRequest`方法，然后将其传给`createServer`方法，这个`onRequest`其实就是替代在第一部分我们传入的匿名函数。



其他的代码其实没有什么大变化，但是这样一看，其实我们的代码逻辑和结构会好很多，这些对于我们后续继续深入非常有好处。到这里，我们在代码结构之前迈进了一小步，但是这只是对于单个文件的优化而已，一旦我们将视野放到整个项目之后，我们就可以考虑一种更好的代码方式：

1. 我们能不能将server.js代码像var http = require("http");直接引用呢？因为在很多地方我们可能都会用到这个代码
2. 我们能不能像PHP一样统一指定一个单入口文件index.js来处理所有进来的请求，然后我们根据请求的类型再去判断执行那一段代码？

带着上面两个问题，我们进行下一步的代码优化：

根据`require("http")`的思路，我们尝试着将`server.js`也封装成一个模块，比如像http调用createServer的共用方法一样，我们可以将server.js代码放在一个共用方法之中，比如我们在server.js创建一个start方法：

```js
var http = require("http");
function start(){
	function onRequest(request, response) {
    	response.writeHead(200, {"Content-Type": "text/plain"});
    	response.write("Hello World");
    	response.end();
	}

	http.createServer(onRequest).listen(8888);
	
	console.log("Server has started.");//用于调试
}

exports.start = start;

```

这样的话，如果调用start方法，就可以达到上面一样的效果了。但是我们怎么在外部文件也可以用到这个start方法呢？这个问题的解决方法就是利用nodejs的exports机制了，我们通过exports.start = start; 将代码提供给其他页面引用。

接下来，我们解决第二个一问：index.js。我们创建一个index.js文件，我们来考虑一下，index.js需要做的哪些工作：

肯定是可以处理请求和作出回应
既然我们在server.js已经写好了可以处理请求和作出回应的服务器代码，我们就可以直接拿来用了，所以，其实现在的index.js只需要很简单的两行代码：

```js
var server = require("./server");  
server.start();
```

我们首先像`var http = require("http");`一样引入自己编写的server代码模块，然后就调用server中的start方法来处理。

在命令行执行`node index.js`

再次访问http://localhost:8888/，会看到同样的Hello World，但是这个时候我们迈进了一大步：我们的代码现在可以很方便地进行管理了。

代码模块化做好之后，我们可以进一步改善我们的服务器，因为目前我们的服务器还是太过简单了，只能返回一个页面(Hello World的简单页面)；但是在现实生活中简单的服务器都是可以根据不同URL来返回不同的页面，所以在这里我们需要引入路由这个功能，也就是用户在请求不同的URL之后，我们根据相应的条件返回不同的页面(或者说数据)给用户。

## 实现路由

在开始之前，需要考虑一下实现路由需要哪几个关键点：

1. 对于用户输入的URL，我们可以获取到
2. 服务器有多个事件处理方法，每个方法可以对应一个或一种URL格式
3. 对于无法处理的URL，抛出相应的错误处理

获取用户输入的URL，可以使用nodejs的官方模块url来实现。所以首先引入url模块：

```js
var url = require("url");
```

引入后，使用url模块的`parse`方法来解析，`parse`方法会返回一个对象，利用该对象的`pathname`属性就可以找出用户输入的url

```js
var pathname url.parse(request.url).pathname;
```

这里的`request.url`就是我们传入的参数，我们只需要request的url部分。所以在`server.js`加上这两行关键代码后，代码结构长这样：

```js
var http = require("http");
var url = require("url");
function start(){
  function onRequest(request, response){
    
    var pathname = url.parse(request.url).pathname;
    console.log("Request for " + pathname + " received.");
    
    response.writeHead(200,{"content-type":"text/plain"});
    response.write("Hello wWorld");
    response.end;
  }
  
  http.createServer(onRequest).listen(8888);
}
exports.start = start;
```

这时用`node index.js`重启服务器，然后在`http://localhost:8888`后面分别尝试加入`/upload` 或`/login`，你在命令行将会看到相应的输出：

```js
Request for /upload received.
```

拿到url之后，接下来实现路由，编写`router.js`。

首先实现最简单的功能，打印出请求的url：

```js
function route(pathname){
  console.log("About to route a request for " + pathname);
}
exports.route = route;
```

像处理`server.js`一样，也将`router,js`模块化，因为后面需要将一些逻辑判断放在这里。这我们不管这些逻辑，我们先来把路由和服务器整合起来。既然上面的`route`方法接受一个参数，那么我们可以通过在server的`start`方法传入参数实现（函数可以被当作一个参数来传入另一个函数）：

```js
function start(route){
  function onRequest(request, response) {
    //其他代码
    var pathname = url.parse(request.url).pathname;
    route(pathname);
    //其他代码
  }
}
```

这样之后，我们也需要相应地修改`index.js`，因为一切地调用都是从这里开始地，我们需要在`index.js`引入我们写的`router`，并且为`start`方法传入参数：

```js
var server = require("./server");
var router = require("./router");
server.start(router.route);
```

引入`router`很熟悉，跟前面地都一样，然后我们将`router`的`route`方法直接传给`server`的`start`方法，也就相当于在`start`方法中使用的`route(pathname);` ，这时候我们重启服务器，再次访问`http://localhost:8888/upload`，就会看到类似下面这样的输出：

```js
Server has started.
About to route a request for /upload
Request for /upload received.
```

## 事件处理

根据不同的请求作出不同的响应

我们这里的策略也是一样的，将事件处理也作为一个模块，我们可以将其命名为：requestHandlers.js。这个文件负责

各种事件处理，所以这里基本就是有相对应方法，像这样：

```js
function start(){
  console.log("You visit /star");
}

function upload(){
  console.log("You visit /upload");
}
exports.start = start;
exports.upload = upload;
```

在我们的设想当中，这里的`start`和`upload`分别对应 `/start `和 `/upload`这两个路径，也就是说，当我们访问`http://localhost:8888/start`和`http://localhost:8888/upload`的时候，就执行这两段代码。

但是，考虑到现实中的情况是：请求处理程序的数量会不断增加，我们当然不想每次有一个新的URL或请求处理程序时，

都要为了在路由里完成请求而到处理程序重新写方法这样反复折腾。于是，我们以巧妙地引入*关联数组* 的方式来解决：我们将一系列请求处理程序通过一个对象来传递，然后将其中的方法名传给`route()`函数。这里可能你看的有点不明白，没关系，看一下代码，其实你就很清晰了：

我们首先稍微修改一下`index.js`

```js
var requestHandlers = require("./requestHandlers");  
var handle = {};  
handle["/"] = requestHandlers.start;  
handle["/start"] = requestHandlers.start;  
handle["/upload"] = requestHandlers.upload;  
server.start(router.route, handle);
```

这里我们就将`handle`作为我们地关联数组对象，我们声明以下三个来触发相对应地事件处理程序：

```js
handle["/"] = requestHandlers.start;  
handle["/start"] = requestHandlers.start;  
handle["/upload"] = requestHandlers.upload;
```

也就是分别对应触发`requestHandlers`中对应地方法，这样做有什么好处呢？其实我们想达到地目的就是：比如我们在访问`/show`的时候可以这样写：

```js
handle["/show"] = requestHandlers.show;
```

最后我们将 `handle`传给`server`的`start`方法，就是为了

在`server`的`start`方法中使用`route`来处理`handle`，所以我们需要对`server`的`start`方法进行稍微地修改:

```js
function start(route, handle) {  
    function onRequest(request, response) {  
        route(handle, pathname);  
    }
}
```

我们得将`start`的参数改为两个`route`, `handle`，然后顺理成章地将`handle`传给`route`方法。那么在`route`方法接受到`handle`之后，我们就可以对这个关联数组来进行处理了，修改`router.js`：

```
function route(handle, pathname) {  
    console.log("About to route a request for " + pathname);  
    if (typeof handle[pathname] === 'function') {  
        handle[pathname]();  
    } else {  
        console.log("No request handler found for " + pathname);  
    }  

}  

exports.route = route;
```

我们将`handle`对象作为参数传给服务器，再由路由接收，最后由路由来判断当前路径对应的请求处理程序存在否，

存在的话就调用对应的函数。

我们可以用从关联数组中获取元素一样的方式从传递的对象中获取请求处理函数，

因此就有了简洁流畅的形如`handle[pathname]();`的表达式

这样一来，我们就可以根据不同请求作出不同的处理了。但是到这里，整条路都通了，但是貌似目前的服务器并没有给我们返回一些有意义的东西，不过不要担心，我们前面铺的路还是很有用的啊。我们只需要稍稍修改一些代码即可,就是以下两个点：

1. 让请求处理程序通过`onRequest`函数直接返回`（return()）`他们要展示给用户的信息。
2. 让我们从让请求处理程序返回需要在浏览器中显示的信息开始。

我们需要将`requestHandler.js`修改为如下形式

```js
function start() {  
  console.log("Request handler 'start' was called.");  
  return "Hello Start";  
}  

function upload() {  
  console.log("Request handler 'upload' was called."); 
  return "Hello Upload";  
}  

exports.start = start;  
exports.upload = upload;
```

我们不在是只单单`console.log`来查看我们的方法是否被调用了，这次我们分别使用return来返回相对应的内容。

既然有内容返回，请求路由也需要将请求处理程序返回给它的信息返回给服务器，也是在`router.js`加一个`return`：

```js
function route(handle, pathname) {  
    console.log("About to route a request for " + pathname);  
    if (typeof handle[pathname] === 'function') {  
        return handle[pathname]();  // here
    } else {  
        console.log("No request handler found for " + pathname);  
        return "404 Not found";  // here
    }  
}  

exports.route=route;
```

从上面代码看到的一样，如果请求路由不存在，我们直接抛给用户一个`404 Not Found`。

最后，我们需要对我们的server.js进行重构以使得它能够将请求处理程序通过请求路由返回的内容展示给浏览器：

```js
function start(route, handle) {  
    function onRequest(request, response) {  
        // other codes 
        response.writeHead(200, {"Content-Type": "text/plain"});
        var content = route(handle, pathname);  
        // other codes
        response.write(content);  
    }
}
```

其他代码不用修改，我们只是将`route`返回的内容保存到`content`中，再用`response.write(content);`将不同的

返回信息输出。这样之后，我们重启以下服务器，分别访问下面几个url：

```js
http://localhost:8888/start
http://localhost:8888/upload
http://localhost:8888/foo
```

一个简单的服务器其实就已经实现了。

