'use strict'
// Template version: 1.3.1
// see http://vuejs-templates.github.io/webpack for documentation.
const path = require('path')

module.exports = {
  dev: {
    // Paths
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {
      "/apis": {
        // 测试环境
        target: "http://localhost:8080", //目标接口域名
        changeOrigin: true, //是否跨域
        pathRewrite: {
          "^/apis": ""
        }
      }
    },
    // Various Dev Server settings
    // 本地电脑ip
    // host: '192.168.1.103', // can be overwritten by process.env.HOST
    // 本地
    host: 'localhost', // can be overwritten by process.env.HOST
    port: 8080, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
    autoOpenBrowser: true, //是否在编译（输入命令行npm run dev）后打开http://localhost:8080/页面，以前配置为true，近些版本改为false，个人偏向习惯自动打开页面 
    errorOverlay: true, //浏览器错误提示
    notifyOnErrors: true, //跨平台错误提示
    poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-

    /**
     * Source Maps
     */

    // https://webpack.js.org/configuration/devtool/#development
    devtool: 'cheap-module-eval-source-map',

    // If you have problems debugging vue-files in devtools,
    // set this to false - it *may* help
    // https://vue-loader.vuejs.org/en/options.html#cachebusting
    cacheBusting: true,

    cssSourceMap: true
  },

  build: {
    // Template for index.html
    index: path.resolve(__dirname, '../dist/index.html'),

    // Paths
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: './',
    //打开dist文件夹下新生成的index.html文件，会发现页面空白，打开控制台会发现页面中引用的css和js文件都找不到：只要把assetsPublicPath: "/"改成assetsPublicPath: "./"
    // assetsPublicPath 有两个，一个是build里的，一个是dev里的，只用把build里的改成‘./’，dev里的别改

    /**
     * Source Maps
     */

    // productionSourceMap: true, 
    productionSourceMap: false,//是环境设置为生产环境
    // https://webpack.js.org/configuration/devtool/#production
    devtool: '#source-map',

    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],

    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  }
}
