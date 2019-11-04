module.exports = {
  method: 'get',
  // 基础url前缀
  baseURL: process.env.API_BASE_URL,
  // 请求头信息
  headers: {
    accept: '*/*',
    'content-type': 'application/x-www-form-urlencoded'
  },
  // Body 参数 (post,put,delete 等请求参数)
  data: {},
  // Query 参数 （get 请求URL?后面拼接的参数）
  params: {},
  // 设置超时时间
  timeout: 15000,
  // 携带凭证
  withCredentials: false,
  // 返回数据类型
  responseType: 'json'
  // `transformResponse` 在传递给 then/catch 前，允许修改响应数据
  // transformResponse: [function (data) {
  //   // 对 data 进行任意转换处理
  //   return data
  // }]
}
