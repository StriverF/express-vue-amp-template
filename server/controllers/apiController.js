


module.exports.tikTokHotTag = function (req, res) {
  if (process.env.DEBUG === 'true') console.log('\x1b[45;37m 调用了apiController.tikTokHotTag 控制器  \x1b[45;34m%s  \x1b[45;33m%o\x1b[0m', req.originalUrl, req.params)
  let tikTokHotTagData = require(`../data/HotType.json`)
  res.json(tikTokHotTagData)
}

module.exports.tikTokHotTagContent = function (req, res) {
  if (process.env.DEBUG === 'true') console.log('\x1b[45;37m 调用了apiController.tikTokHotTagContent 控制器  \x1b[45;34m%s  \x1b[45;33m%o\x1b[0m', req.originalUrl, req.params)
  let douyinTopic1st = req.query.DOUYIN_TOPIC_1ST
  let douyinTopic2nd = req.query.DOUYIN_TOPIC_2ND
  let tikTokHotTagContentData = require(`../data/HotTypeContent.json`)
  let contentData = []
  if (tikTokHotTagContentData.hasOwnProperty(douyinTopic1st)) {
    let douyinTopic1stContent = tikTokHotTagContentData[douyinTopic1st]
    if (douyinTopic1stContent.hasOwnProperty(douyinTopic2nd)) {
      contentData = douyinTopic1stContent[douyinTopic2nd]
    }
  }
  res.json(contentData)
}
