const commandLineArgs = require('command-line-args')
const { loadAgent, unloadAgent, isAgentLoaded, hasAgentDefinitionFileBeenInstalled } = require('./agent-utils')
const { printUsage, optionDefinitions } = require('./command-info')

function runCommand(argv) {
  const { command } = commandLineArgs(optionDefinitions, { argv, stopAtFirstUnknown: true })

  if (command === 'status') {
    console.log(isAgentLoaded() ? 'Agent is loaded' : 'Agent is not loaded')
    return
  }

  if (command === 'load') {
    if (isAgentLoaded()) {
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
    if (!isAgentLoaded()) {
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
