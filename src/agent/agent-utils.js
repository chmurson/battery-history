const { existsSync } = require('fs')
const { execSync } = require('child_process')
const agentLabel = 'chmurson.battery-history'

function getAgentStatus() {
  try {
    const result = execSync(`launchctl list | grep ${agentLabel}`).toString()
    const statusCode = parseInt(result.split('\t')[1])
    return {
      loaded: true,
      statusCode,
    }
  } catch (e) {
    if (e && e.status === 1) {
      return {
        loaded: false,
        statusCode: undefined,
      }
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
  getAgentStatus,
  unloadAgent,
  loadAgent,
  hasAgentDefinitionFileBeenInstalled,
}
