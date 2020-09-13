const { execSync } = require('child_process')
const { dateFormat } = require('./consts')
const { format } = require('date-fns')

class ExecCommandException extends Error {}

class JSONParseException extends Error {}

class BatteryDataException extends Error {}

function getBatteryStats() {
  const buffer = execCmd()
  const json = parseCmdResultToJSON(buffer)
  return findBatteryInformation(json)
}

function execCmd() {
  try {
    return execSync('system_profiler SPPowerDataType -json')
  } catch (e) {
    throw new ExecCommandException()
  }
}

function parseCmdResultToJSON(buffer) {
  try {
    return JSON.parse(buffer.toString())
  } catch (e) {
    throw new JSONParseException()
  }
}

function findBatteryInformation(json) {
  const { SPPowerDataType } = json
  if (!SPPowerDataType) {
    throw new BatteryDataException()
  }
  const batteryInfo = SPPowerDataType.find((x) => x._name === 'spbattery_information')
  if (!batteryInfo) {
    throw new BatteryDataException()
  }
  try {
    const {
      sppower_battery_health_info: { sppower_battery_cycle_count, sppower_battery_health },
      sppower_battery_charge_info: { sppower_battery_max_capacity },
    } = batteryInfo

    return {
      cycleCount: sppower_battery_cycle_count,
      maxCapacity: sppower_battery_max_capacity,
      batteryHealth: sppower_battery_health,
    }
  } catch (e) {
    throw new BatteryDataException()
  }
}

function getBatteryStatsInCSVFormat({ includeHeader, onlyHeader }) {
  const stats = getBatteryStats()
  const result = []
  if (includeHeader || onlyHeader) {
    result.push(['Date', ...Object.keys(stats)].join(';'))
  }
  if (!onlyHeader) {
    date = format(new Date(), dateFormat)
    result.push([date, ...Object.values(stats)].join(';'))
  }
  return result
}

module.exports = {
  getBatteryStats,
  getBatteryStatsInCSVFormat,
}
