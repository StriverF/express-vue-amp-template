const axios = require('axios')
const patpatApiConfig = require('./configs/patpatApi')
const trackApiConfig = require('./configs/trackApi')
/**
 * 可配置多个API请求类对象
 */
let patpatApi = axios.create(patpatApiConfig)
let trackApi = axios.create(trackApiConfig)

patpatApi.interceptors.request.use(
  config => {
    config.headers['customers-ip'] = global.customersIp
    config.headers['Authorization'] = process.env.AUTHORIZATION
    // console.log('return api config', config)
    return config
  },
  error => {
    return Promise.reject(error)
  }
)
module.exports.patpatApi = patpatApi

module.exports.trackApi = trackApi
