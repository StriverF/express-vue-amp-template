const axios = require('axios')
const tikTokApiConfig = require('./configs/tikTokApi')
const trackApiConfig = require('./configs/trackApi')
/**
 * 可配置多个API请求类对象
 */
let tikTokApi = axios.create(tikTokApiConfig)
let trackApi = axios.create(trackApiConfig)

tikTokApi.interceptors.request.use(
  // debugger
  config => {
    config.headers['Authorization'] = process.env.VUE_APP_AUTHORIZATION
    // console.log('return api config', config)
    return config
  },
  error => {
    return Promise.reject(error)
  }
)
module.exports.tikTokApi = tikTokApi

module.exports.trackApi = trackApi

