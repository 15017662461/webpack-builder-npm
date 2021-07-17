# webpack-builder-npm

## 使用之前必看

**本构建工具暂不支持开箱即用，需要进行额外的配置。**

**目前支持的打包仅有：js(含react)、css、less、图片、html，包含的功能有：**

+ css：压缩、文件指纹、拆分出单独的css文件、自动补齐css3前缀、px自动转换rem
+ js：解析es6、压缩、文件指纹
+ html：压缩、引入对应的js和css
+ 其他：多页面打包、sourcemap、treeshaking、scope hoisting、SSR、代码分割(动态import 懒加载)、公共资源提取(包含自行引用的文件和第三方库)、优化命令行提示、自动清理上一次的构建目录、开发模式热更新、文件监听

## 需要自行进行的配置

### package.json

```json
{
  "scripts":{
    "build": "webpack --config ./node_modules/webpack-builder-npm/lib/webpack.prod.js",
"watch": "webpack --watch",
"dev": "webpack-dev-server --config ./node_modules/webpack-builder-npm/lib/webpack.dev.js --open",
"build:ssr": "webpack --config ./node_modules/webpack-builder-npm/lib/webpack.ssr.js"
  }
}
```

### .babelrc

**需要自行在根目录下新建.babelrc文件**

```json
{
  "presets": [
    ["@babel/preset-env"],
    "@babel/preset-react"
  ],
  "plugins":[
    "@babel/plugin-syntax-dynamic-import"
  ]
}
```

### postcss.config.js

**需要自行在根目录下新建postcss.config.js文件**

```js
module.exports = {
  plugins: [
    require('autoprefixer')({
      overrideBrowserslist: ['last 2 version', '>1%'],
    }),
  ],
};
```

## 使用方式

### 多页面打包

如果需要使用多页面打包，请遵循以下规则：

根目录创建src文件夹，将每个页面的文件统一放在一个文件夹并放入src中，每个页面的html命名为index.html、js入口文件命名为index.js。

参考目录层次如下所示：两个页面分别为index首页和search搜索页面

```
- src
-- index
---- index.html
---- index.js
---- index依赖的js
---- index依赖的css/less
---- index依赖的html
-- search
---- index.html
---- index.js
---- search依赖的js
---- search依赖的css/less
---- search依赖的html
```



### 单页面打包

规则同多页面打包



### 服务端渲染打包

需要将对应的服务端渲染的js入口文件命名为index-server.js，同时注意服务端渲染的js文件编写规则

```
- src
-- index
---- index.html
---- index-server.js  // 这个是服务端渲染的js入口
---- index依赖的js
---- index依赖的css/less
---- index依赖的html
-- search
---- index.html
---- index-server.js // 这个是服务端渲染的js入口
---- search依赖的js
---- search依赖的css/less
---- search依赖的html
```

