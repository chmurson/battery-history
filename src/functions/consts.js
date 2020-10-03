const path = require('path')
const dateFormat = 'dd.MM.yyyy'
const appLocalSettingsFolderPath = path.resolve(process.env.HOME, '.battery-history')

module.exports = {
  dateFormat,
  appLocalSettingsFolderPath,
}
