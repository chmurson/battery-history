const formatISO = require('date-fns/formatISO')
const { getStatsDataCSVString, getStatsHeaderCSVString } = require('./get-stats-csv-string')
const { saveHistory } = require('./history-access')

function updateHistoryStats(historyStats, currentStats) {
  const todayDateString = formatISO(new Date(), { representation: 'date' })
  const hasHistoryTodaysEntry = historyStats.lastDayOfMeasurement === todayDateString
  let csvLine = getStatsDataCSVString(new Date(), currentStats)
  const addHeader = historyStats.lastDayOfMeasurement === undefined
  if (addHeader) {
    csvLine = `${getStatsHeaderCSVString()}\n${csvLine}`
  }
  saveHistory(csvLine, { replaceLastEntry: hasHistoryTodaysEntry })
}

module.exports = {
  updateHistoryStats,
}
