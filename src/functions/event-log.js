const path = require('path')
const { appendFileSync } = require('fs')
const { appLocalSettingsFolderPath } = require('./consts')

const eventLogFile = path.resolve(appLocalSettingsFolderPath, 'event.log')

function writeUpdatingHistoryEvent({ isAgent }) {
  const text = `${new Date().toISOString()}: history updated - ${isAgent ? 'agent' : 'manual'}`
  appendFileSync(eventLogFile, text + '\n')
}

module.exports = {
  writeUpdatingHistoryEvent,
}
