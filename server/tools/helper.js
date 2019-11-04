/**
 * 时间格式转UTC时间戳
 * @param {String} dateString 字符串格式时间
 * @returns {number} UTC时间戳
 */
exports.dateToTimestamp = function (dateString) {
  let date = new Date(dateString.replace(/-/g, '/'))
  let utcTimestamp = Date.UTC(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    date.getHours(),
    date.getMinutes(),
    date.getSeconds()
  )
  return utcTimestamp
}
