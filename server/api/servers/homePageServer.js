const serverApi = require('../index')
const redisCahce = require('../../tools/redisCache')
const constants = require('../../tools/constants')

exports.getTikTokHotTagData = (callback) => {
  (async () => {
    try {
      
      let renderData = {
        meta: '<meta name="keywords" content="express + vue + amp "/>',
        apiJonsContent: ''
      }

      let content = {
        pageType: 'home',
        apiData: {}
      }

      // 获取首页版位数据
      console.time()
      // 从Redis缓存获取抖音热门标签
      let tikTokHotTagCacheData = await redisCahce.getRedisCahceData(constants.redisKeyTikTokHotTagData)
      if (tikTokHotTagCacheData) {
        content.apiData.tikTokHotTag = tikTokHotTagCacheData
        renderData.apiJonsContent = JSON.stringify(content)
        callback(renderData)
      } else {
        let tikTokHotTagData = require(`../../data/HotType.json`)
        redisCahce.addRedisCahceData(constants.redisKeyTikTokHotTagData, tikTokHotTagData, constants.redisExpireSevenDays)
        // 正常可以在node服务端请求业务api，这里模板只直接读取json数据。
        // serverApi.tikTokApi.get('/tikTok/HotTag', { params: {} }).then(res => {
        //   if (res.status === 200) {
        //     content.apiData.tikTokHotTag = res.data
        //     redisCahce.addRedisCahceData(constants.redisKeyTikTokHotTagData, res.data, constants.redisExpireSevenDays)
        //     renderData.apiJonsContent = JSON.stringify(content)
        //     callback(renderData)
        //   } else {
        //     throw new Error('请求/tikTok/HotTag API失败')
        //   }
        // }).catch(error => {
        //   throw error
        // })
      }
    } catch (error) {
      callback(null, error)
    }
  })()
}

