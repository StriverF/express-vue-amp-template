const glob = require('glob')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

const date = Date.now()
const buildType = `balog-${date}`

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
module.exports = {

   // 多页面入口配置
  pages,
  
  // 静态资源目录配置，不配置默认 js、css等资源目录会直接在根目录
  assetsDir: 'static',

  // cdn域名配置
  publicPath: '/',
  // 输出文件目录
  outputDir: 'server/public',

  chainWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
      config.plugin('bundle-analyzer').use(
        new BundleAnalyzerPlugin({
          analyzerMode: 'static',
          reportFilename: `../../report/build-type-${buildType}.html`
        })
      )
    }
  },
  // PWA 插件相关配置
  // see https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-pwa
  pwa: {
    name: 'EVAP',
    workboxOptions: {
      swDest: process.env.VUE_APP_PWA_SW_DEST,
      skipWaiting: true, // 跳过老缓存资源的生命周期使其更新新的资源
      clientsClaim: true,
      // importWorkboxFrom: 'local',
      // include: [  //筛选需要缓存的静态资源，不配置默认缓存全部静态资源
      //   /mainSite\/index.html$/,
      //   /static\/js\/mainSite.[\s\S]*\.js$/,
      //   /static\/css\/mainSite.[\s\S]*\.css$/,
      //   /static\/js\/chunk-vendors.[\s\S]*\.js$/,
      //   /static\/css\/chunk-vendors.[\s\S]*\.css$/
      // ],
      // directoryIndex: 'mainSite/index.html', //把html文档也进行缓存，可以实现无网络正常流量页面，但是如果htm文档需要动态注入数据的话，不建议启用。
      cacheId: 'pps-cache'
    }
  },
  devServer: {
    historyApiFallback: {
      rewrites: [
        { from: /subsite/, to: '/subSite/index.html' },
        { from: /^\/[\s\S]*/, to: '/mainSite/index.html' }
      ]
    }
  }
}