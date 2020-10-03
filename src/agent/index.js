const commandLineArgs = require('command-line-args')
const { loadAgent, unloadAgent, getAgentStatus, hasAgentDefinitionFileBeenInstalled } = require('./agent-utils')
const { printUsage, optionDefinitions } = require('./command-info')

function runCommand(argv) {
  const { command } = commandLineArgs(optionDefinitions, { argv, stopAtFirstUnknown: true })

  const { loaded, statusCode } = getAgentStatus()

  if (command === 'status') {
    if (loaded) {
      console.log(
        statusCode === 0
          ? 'Agent is loaded'
          : `Agent is loaded, but is not working. Last status code is ${statusCode}. Try to reinstall batter-history, or/and update it.`,
      )
    } else {
      console.log('Agent is not loaded')
    }
    return
  }

  if (command === 'load') {
    if (loaded) {
      console.log('Agent is already loaded')
      process.exit(1)
    }
    if (!hasAgentDefinitionFileBeenInstalled()) {
      console.log('Agent has not been installed. Please reinstall Battery History.')
      process.exit(1)
    }
    try {
      loadAgent()
      console.log(`Agent has been loaded.`)
    } catch (e) {
      console.log(`Loading agent finished with error.`)
      process.exit(1)
    }
    return
  }

  if (command === 'unload') {
    if (!loaded) {
      console.log('Agent has not been loaded')
      process.exit(1)
    }
    try {
      unloadAgent()
      console.log(`Agent has been unloaded.`)
    } catch (e) {
      console.log(`Unloading agent finished with error.`)
      process.exit(1)
    }
    return
  }

  if (command) {
    console.log('Unrecognized command')
    process.exit(1)
  }

  if (!command) {
    printUsage()
  }
}

module.exports = {
  runCommand,
}
