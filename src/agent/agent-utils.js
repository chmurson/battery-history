const { existsSync } = require('fs')
const { execSync } = require('child_process')
const agentLabel = 'chmurson.battery-history'

function isAgentLoaded() {
  try {
    execSync(`launchctl list | grep ${agentLabel}`)
    return true
  } catch (e) {
    if (e && e.status === 1) {
      return false
    }
    throw e
  }
}

const pathToAgentDefinitionFile = `${process.env.HOME}/Library/LaunchAgents/chmurson.battery-history.plist`

function unloadAgent() {
  execSync(`launchctl unload ${pathToAgentDefinitionFile}`)
}

function loadAgent() {
  execSync(`launchctl load ${pathToAgentDefinitionFile}`)
}

function hasAgentDefinitionFileBeenInstalled() {
  return existsSync(pathToAgentDefinitionFile)
}

module.exports = {
  isAgentLoaded,
  unloadAgent,
  loadAgent,
  hasAgentDefinitionFileBeenInstalled,
}
