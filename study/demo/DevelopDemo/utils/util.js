function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()

  return formatNumber(year)+"年"+formatNumber(month)+"月"+formatNumber(day)+"日"
  //return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}
function dateInfo(date) {
  var dateInfo={
    year:date.getFullYear(),
    month:date.getMonth() + 1,
    day:date.getDate(),
    hour:date.getHours(),
    minute:date.getMinutes(),
    second : date.getSeconds()
}
   return dateInfo;
}
function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

module.exports = {
  formatTime: formatTime,
  dateInfo:dateInfo
}
