const { formatNumber } = require('../functions/string-helpers')

const possibleRanges = [7, 30, 60, 90, 180, 365, 365 * 2, 365 * 3, 365 * 4, 365 * 5, 365 * 6, 365 * 7]

module.exports = {
  getRichPrintOutput: (stats, historyStats) => {
    const { lastDayOfMeasurement, daysSinceFirstMeasurement } = historyStats
    const rangesToBeUsed = possibleRanges.filter((x) => x < daysSinceFirstMeasurement)
    return `
Cycles count
  current: ${stats.cycleCount}
${rangesToBeUsed.map((daysNumber) => `  ${x(historyStats.cycleCountDiff.getLastXDays, daysNumber)}`).join('\n')}
  ${x(historyStats.cycleCountDiff.getLastXDays, daysSinceFirstMeasurement)} (first measurement) 

Max capacity: 
  current: ${stats.maxCapacity} mAh
${rangesToBeUsed.map((daysNumber) => `  ${x(historyStats.maxCapacityDiff.getLastXDays, daysNumber)}`).join('\n')}
  ${x(historyStats.maxCapacityDiff.getLastXDays, daysSinceFirstMeasurement)} (first measurement) 

Battery health: ${stats.batteryHealth} 

Last day of measurement: ${formatNumber(lastDayOfMeasurement)}
Days since first measurement: ${formatNumber(daysSinceFirstMeasurement)}
  `
  },
}

function x(getter, xDays) {
  return `last ${xDays} days: ${formatNumber(getter(xDays), { showSign: true })}`
}
