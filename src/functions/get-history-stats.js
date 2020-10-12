const { getHistory } = require('./history-access')
const { dateFormat } = require('./consts')
const { set, subDays, isAfter, differenceInDays, parse, formatISO } = require('date-fns')

const COLUMN_DATE = 0
const COLUMN_CYCLE_COUNT = 1
const COLUMN_MAX_CAPACITY = 2
const COLUMN_HEALTH = 3

function parseDate(dateString) {
  return parse(dateString, dateFormat, new Date())
}

function getHistoryStats() {
  const notParsedHistory = getHistory()
  const history = notParsedHistory
    .split('\n')
    .filter((x) => !!x) //clear empty lines
    .map((x) => x.split(';'))
    .slice(1) //parse csv file and omit header

  if (history.length === 0) {
    return {
      lastDayOfMeasurement: undefined,
      daysSinceFirstMeasurement: undefined,
      cycleCount: {
        last7Days: undefined,
        last30Days: undefined,
      },
      maxCapacity: {
        last7Days: undefined,
        last30Days: undefined,
      },
    }
  }

  const firstMeasureDate = parseDate(history[0][COLUMN_DATE])
  const lastMeasurement = history[history.length - 1]
  const lastMeasurementDate = parseDate(lastMeasurement[COLUMN_DATE])
  const daysSinceFirstMeasurement = differenceInDays(lastMeasurementDate, firstMeasureDate)
  const lastDayOfMeasurement = formatISO(lastMeasurementDate, { representation: 'date' })
  return {
    lastDayOfMeasurement,
    daysSinceFirstMeasurement,
    cycleCountDiff: {
      getLastXDays: (daysNumber) => getColumnDiffBetweenXDaysAndLast(history, daysNumber, COLUMN_CYCLE_COUNT),
    },
    maxCapacityDiff: {
      getLastXDays: (daysNumber) => getColumnDiffBetweenXDaysAndLast(history, daysNumber, COLUMN_MAX_CAPACITY),
    },
  }
}

function getLastMeasurementInXDays(history, daysNumber) {
  const today = set(new Date(), {
    milliseconds: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })
  const xDaysAgo = subDays(today, daysNumber)
  const lastMeasurementInGivenTime = history.filter((historyEntry) => {
    const date = parseDate(historyEntry[COLUMN_DATE])
    return isAfter(date, xDaysAgo)
  })
  if (lastMeasurementInGivenTime.length === 0) {
    return undefined
  }
  return lastMeasurementInGivenTime[0]
}

function getColumnDiffBetweenXDaysAndLast(history, daysNumber, column) {
  const lastMeasurementInThisMonth = getLastMeasurementInXDays(history, daysNumber)
  const lastMeasurement = history[history.length - 1]
  if (!lastMeasurementInThisMonth) {
    return undefined
  }
  return lastMeasurement[column] - lastMeasurementInThisMonth[column]
}

module.exports = {
  getHistoryStats,
}
