const commandLineArgs = require('command-line-args')
const { getBatteryStats } = require('../functions/get-current-stats')
const { getHistoryStats } = require('../functions/get-history-stats')
const { writeUpdatingHistoryEvent } = require('../functions/event-log')
const { updateHistoryStats } = require('../functions/update-history-stats')
const { getStatsDataCSVString, getStatsHeaderCSVString } = require('../functions/get-stats-csv-string')
const { getRichPrintOutput } = require('./get-rich-print-ouput')
const { optionDefinitions, printUsage } = require('./command-info')

function runCommand(argv) {
  const options = commandLineArgs(optionDefinitions, { argv })
  const stats = getBatteryStats()
  const historyStats = getHistoryStats()
  updateHistoryStats(historyStats, stats)
  writeUpdatingHistoryEvent({ isAgent: options.agent })

  if (options.help) {
    printUsage()
    return
  }

  if (options.json) {
    console.log(stats)
    return
  }

  if (options.csv) {
    if (options.header || options['header-only']) {
      console.log(getStatsHeaderCSVString(stats))
    }
    if (!options['header-only']) {
      console.log(getStatsDataCSVString(new Date(), stats))
    }
    return
  }

  console.log(getRichPrintOutput(stats, historyStats))
}

module.exports = {
  runCommand,
}
