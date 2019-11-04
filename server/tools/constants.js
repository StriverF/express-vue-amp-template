var constants = {
  // Redis 缓存7天过期
  redisExpireSevenDays: 60 * 60 * 24 * 7,
  // Redis 缓存1天过期
  redisExpireOneDay: 60 * 60 * 24,
  // Redis 缓存5分钟过期
  redisExpireFiveMinutes: 60 * 5,
  // Redis 缓存1分钟过期
  redisExpireOneMinutes: 60,

  
  // Redis Key
  redisKeyTikTokHotTagData: 'tik_tok_hot_tag_data',


}

module.exports = constants
