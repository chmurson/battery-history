const { dateFormat } = require('./consts')
const format = require('date-fns/format')
const statsColumnOrder = ['cycleCount', 'maxCapacity', 'batteryHealth']

function getStatsDataCSVString(date, currentStats) {
  const dateString = format(date, dateFormat)
  return [dateString, ...statsColumnOrder.map((column) => currentStats[column])].join(';')
}

function getStatsHeaderCSVString() {
  return ['Date', ...statsColumnOrder].join(';')
}

module.exports = {
  getStatsHeaderCSVString,
  getStatsDataCSVString,
}
