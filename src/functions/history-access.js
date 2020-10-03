const path = require('path')
const { readFileSync, appendFileSync } = require('fs')
const readLastLine = require('read-last-line')
const { appLocalSettingsFolderPath } = require('./consts')

const historyFilePath = path.resolve(appLocalSettingsFolderPath, 'log.csv')

function getHistory() {
  const historyContent = readFileSync(historyFilePath)
  return historyContent.toString('UTF-8')
}

function saveHistory(csvEntry, { replaceLastEntry = false }) {
  const performSaving = () => appendFileSync(historyFilePath, csvEntry + '\n')
  if (replaceLastEntry) {
    removeLastLine(historyFilePath, performSaving)
  } else {
    performSaving()
  }
}

module.exports = {
  getHistory,
  saveHistory,
}

function removeLastLine(historyFilePath, onComplete) {
  var lines2nuke = 1

  readLastLine.read(historyFilePath, lines2nuke).then((lines) => {
    var to_vanquish = lines.length
    fs.stat(historyFilePath, (err, stats) => {
      if (err) throw err
      fs.truncate(historyFilePath, stats.size - to_vanquish, (err) => {
        if (err) throw err
        console.log('File truncated!')
      })
    })
  })
}
