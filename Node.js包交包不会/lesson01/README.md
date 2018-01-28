## 创建一个express应用

### 目标

建立一个小项目，在其中编写代码。当在浏览器中访问 <u>http:localhost:3000/</u> 时，输出 `hello world`。

### 内容

#### Express框架安装

新建一个lesson1文件夹，进入该文件夹，安装express

```
$ mkdir lesson1 && cd lesson1
# 这里没有从官方 npm 安装，而是使用了大淘宝的 npm 镜像
$ npm install express --registry=https://registry.npm.taobao.org	
```
#### 代码编写

新建一个app.js文件

```
$ touch app.js
```
app.js中的内容为：

```js
// 引入 `express` 模块，并将它赋予 `express` 这个变量等待使用。
var express = require('express');

// 调用 express函数，返回一个 express 实例，并赋值给 app 变量。
var app = express();

// 调用 express 实例中的 get 方法，为我们的 `/` 路径指定一个 handler 函数。
// 这个 handler 函数会接收 req 和 res 两个对象，他们分别是请求的 request 和 response。
// request 中包含了浏览器传来的各种信息，比如 query ，body ，headers 之类的，都可以通过 req 对象访问到。
// res 对象，我们一般不从里面取信息，而是通过它来定制我们向浏览器输出的信息，比如 header 信息，比如想要向浏览器输出的内容。这里我们调用了它的 #send 方法，向浏览器输出一个字符串。
app.get('/', function (req, res) {
  res.send('Hello World');
});

// 定义好我们 app 的行为之后，让它监听本地的 3000 端口。这里的第二个函数是个回调函数，会在 listen 动作成功后执行，我们这里执行了一个命令行输出操作，告诉我们监听动作已完成。
app.listen(3000, function () {
  console.log('app is listening at port 3000');
});
```
执行app.js

```
$ node app.js
```
在浏览器访问 `http://localhost:3000/`，会出现 `Hello World`。



#### 知识归纳

express应用的代码结构为：

1. 引入express模块，创建实例；
2. 调用实例的get方法，为路径指定处理函数（该函数接受req和res两个对象参数）；
3. 实例监听端口。

npm命令：

- `mkdir 文件夹名`  新建一个文件夹
- `cd 文件夹名`  进入当前路径下的文件夹
- `ls  文件夹名`  列出文件夹中的文件目录
- `npm list` 列出当前文件夹下的所有文件目录
- `touch app.js`  新建一个名为app.js的文件
