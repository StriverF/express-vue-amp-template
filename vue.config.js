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

  devServer: {
    historyApiFallback: {
      rewrites: [
        { from: /subsite/, to: '/subSite/index.html' },
        { from: /^\/[\s\S]*/, to: '/mainSite/index.html' }
      ]
    }
  }
}