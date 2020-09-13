const commandLineArgs = require('command-line-args')
const { getHistory } = require('../functions/history-access')
const { optionDefinitions, printUsage } = require('./command-info')

function runCommand(argv) {
  const options = commandLineArgs(optionDefinitions, { argv })
  if (options.help) {
    printUsage()
  } else {
    console.log(getHistory())
  }
}

module.exports = {
  runCommand,
}
