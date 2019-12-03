# Express+Vue+AMP+PWA项目模板使用说明
![pwa-link](https://cdn.patpat.site/mweb/pwa-link.jpg)
## 介绍
特点
* 解决单页面应用(SPA)的SEO配置问题
* 拥有可控的服务端中间件功能，服务端重定向，服务端打cookie等
* 可在服务端根据前端需要组装数据供首屏渲染使用
* 可方便开发AMP页面，并跟vue打包资源同时发布又区分明确的静态资源
* 一键集成PWA功能，附带可用的pwa配置
* 方便vue多页面入口配置，及打包资源分析等等

<!-- more -->

包含技术点
[vue-cli3](https://cli.vuejs.org/guide/installation.html)、[Express](http://expressjs.com/en/guide/routing.html)、[AMP](https://amp.dev/documentation/guides-and-tutorials/?format=websites)、[PWA](https://developer.mozilla.org/zh-CN/docs/Web/Progressive_web_apps)、[Node.js](http://nodejs.cn/api/process.html)、[Redis](https://redis.io/)

项目地址
[StriverF/express-vue-amp-template](https://github.com/StriverF/express-vue-amp-template)

项目运行效果
<img src="/StriverF/express-vue-amp-template/raw/master/demo.gif" />

## 模板项目使用介绍
### 项目环境配置
下载代码后进入项目目录安装依赖
```
npm install
```
#### vue环境配置
vue环境变量配置，在项目跟目录根据自己需求新增 `.env.local`文件，参照.env配置自己想要自定义的环境变量。具体vue-cli 环境变量介绍请看[官方文档](https://cli.vuejs.org/zh/guide/mode-and-env.html)

新建page入口，在`src/pages`目录下面新建文件夹，在新增文件夹下面新增 App.vue,index.html,router.js等其他文件即可，`vue.config.js`里面的pages配置会自动识别新增page目录。
具体配置代码如下,vue.config.js详细配置参考[官方文档](https://cli.vuejs.org/zh/config/)

```javascript
const pages = {}
glob.sync('./src/pages/**/index.js').forEach(path => {
  const chunk = path.split('./src/pages/')[1].split('/index.js')[0]
  pages[chunk] = {
    entry: path,
    template: './src/pages/' + chunk + '/index.html',
    filename: chunk + '/index.html',
    chunks: ['chunk-vendors', 'chunk-common', chunk]
  }
})
```

运行项目执行如下命令

```
npm run serve
```
或者
```
npm run dev
```



#### Node服务端环境配置
服务端环境变量配置，在`server`目录下面新建`.env`把`server/.env.example`文件里面的环境变量复制到`.env`文件，然后根据自己环境需要更改环境变量的值。

本地https证书安全环境配置，更改`.env`的`SERVER_PROTOCOL`的值为`https`, （本地生成免费安全证书可以用[mkcert](https://github.com/FiloSottile/mkcert), [mkcert](https://github.com/FiloSottile/mkcert)是用[golang](https://golang.org/)编写的证书生成工具）
需要把生成的证书文件.pem文件放入到`server/cert`目录。
配置.env的`PRIVATE_KEY_NAME`和`CERTIFICATE_NAME`环境变量值为`server/cert`目录下的文件名。

服务端代码Debugger, 我们知道前端代码可以方便的再浏览器的开发者面板中进行断电调试，但是服务端的代码调试不能，因为服务端的代码不在浏览器执行。那么我这里推荐大家使用VSCode来配置Debugger
![](https://cdn.patpat.site/mweb/15744042522049.jpg)
用VSCode打开项目，操作如上图步骤。会在`.vscode`目录生成launch.json配置文件，在配置文件配置如下配置
```json
{
  // 使用 IntelliSense 了解相关属性。 
  // 悬停以查看现有属性的描述。
  // 欲了解更多信息，请访问: https://go.microsoft.com/fwlink/?linkid=830387
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "启动Node服务",
      "runtimeExecutable": "nodemon",
      "cwd": "${workspaceFolder}/server",
      "program": "${workspaceFolder}/server/app.js",
      "restart": true,
      "console": "integratedTerminal",
      "internalConsoleOptions": "neverOpen"
    }
  ]
}
```
配置完就可以按照下图步骤操作，就能启动服务并可以在服务端任意代码行号左侧点击打断点调试。
![](https://cdn.patpat.site/mweb/15744047509592.jpg)


### 项目主要的脚本命令

| 脚本 | 命令 | 注意事项 |
| --- | --- | --- |
| 运行开发环境 | npm run dev | 只是启动vue的开发环境 |
| 启动服务端环境 | npm run start | 启动node服务端环境 |
| 打包测试环境 | npm run build:test | 打包 |
| 打包预发布环境 | npm run build:alpha | 打包 |
| 打包生产环境 | npm run build:prod | 打包 |

### Express配合Vue&AMP的注意事项
AMP的路由 `ampRoute.js` 使用的`ampMiddleware`设置了view engine 为ejs的渲染模板

```node
 req.app.set('views', './amp/views')
  req.app.set('view engine', 'ejs')
```

而Vue的路由配置的是自定义渲染模板，根据在Vue打包模板里面配置的模板占位变量来从Node服务端注入相关自定义数据。

```node
req.app.engine('html', function (filePath, options, callback) {
    fs.readFile(filePath, function (err, content) {
      if (err) return callback(err)
      var rendered = content
        .toString()
        .replace('##meta##', options.meta)
        .replace('##ampLink##', options.ampLink || '')
        .replace('"##apiJonsContent##"', options.apiJonsContent)
      return callback(null, rendered)
    })
  })
  req.app.set('views', './public')
  req.app.set('view engine', 'html')
```

注意配置 .env的 redis server （需要安装[Redis](https://redis.io/)并启动Redis）

```
REDIS_HOST=127.0.0.1
REDIS_PORT=6379
REDIS_PREFIX=website_mobile_alpha
```
为了提升性能及减少服务器资源开销，在node服务端请求到数据后，最后根据参数及数据类型利用Redis缓存。正常情况请求一个API需要1000mm左右, 从Redis取数据低于10mm。

