const { formatNumber } = require('../functions/string-helpers')

module.exports = {
  getRichPrintOutput: (stats, historyStats) => `
Battery stats:  
==============
Cycle count
  current: ${stats.cycleCount}
  last 7 days: ${formatNumber(historyStats.cycleCount.last7Days, { showSign: true })}
  last 30 days: ${formatNumber(historyStats.cycleCount.last30Days, { showSign: true })}
Max capacity: 
  current: ${stats.maxCapacity}
  last 7 days: ${formatNumber(historyStats.maxCapacity.last7Days, { showSign: true })}
  last 30 days: ${formatNumber(historyStats.maxCapacity.last30Days, { showSign: true })}
Battery health: ${stats.batteryHealth} 

Last day of measurment: ${formatNumber(historyStats.lastDayOfMeasurement)}
Days since first measurement: ${formatNumber(historyStats.daysSinceFirstMeasurement)}
  `,
}
