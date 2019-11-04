const cache = require('express-redis-cache')
var redisCahce = cache({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
  prefix: process.env.REDIS_PREFIX
})
/**
 * 获取Redis缓存
 * @param {*} RedisKey
 */
exports.getRedisCahceData = function (redisCahceKey) {
  return new Promise(function (resolve, reject) {
    redisCahce.get(redisCahceKey, function (error, entries) {
      if (error) {
        reject(error)
      } else {
        if (entries.length > 0) {
          let entrie = entries[0]
          let data = entrie.body
          if (entrie.type === 'json') {
            data = JSON.parse(data)
          }
          resolve(data)
        } else {
          resolve(null)
        }
      }
    })
  })
}

/**
 * 添加或更新 Redis缓存
 * @param {*} RedisKey
 */
exports.addRedisCahceData = function (redisCahceKey, cahceData, expire = 60 * 60 * 24 * 30, type = 'json') {
  return new Promise(function (resolve, reject) {
    if (typeof cahceData === 'object') {
      cahceData = JSON.stringify(cahceData)
    }
    redisCahce.add(redisCahceKey, cahceData, { expire: expire, type: type }, function (error, added) {
      if (error) {
        reject(error)
      } else {
        resolve(added)
      }
    })
  })
}

/**
 * 删除 Redis缓存
 * @param {*} RedisKey
 */
exports.delRedisCahceData = function (redisCahceKey) {
  return new Promise(function (resolve, reject) {
    redisCahce.cache.del(redisCahceKey, function (error) {
      if (error) {
        reject(error)
      } else {
        resolve(true)
      }
    })
  })
}
