#!/usr/bin/env node
const commandLineArgs = require('command-line-args')

const mainDefinitions = [{ name: 'command', defaultOption: true }]
const { command, _unknown = [] } = commandLineArgs(mainDefinitions, { stopAtFirstUnknown: true })
const argv = _unknown

// commands belows

if (command === 'agent') {
  const { runCommand } = require('./src/agent')
  runCommand(argv)
  process.exit(0)
}

if (command === 'show' || (command == null && _unknown.length === 0)) {
  const { runCommand } = require('./src/show')
  runCommand(argv)
  process.exit(0)
}

if (command === 'history') {
  const { runCommand } = require('./src/history')
  runCommand(argv)
  process.exit(0)
}

if (command === 'help') {
  printHelp()
  process.exit(0)
}

console.log('Unrecognized command or option')
printHelp()
process.exit(1)

// internals below

function printHelp() {
  const commandLineUsage = require('command-line-usage')
  const sections = [
    {
      header: 'Battery History',
      content: 'Tracks and stores basic information about battery throughout time.',
    },
    {
      header: 'Synopsis',
      content: '$ app <command> <option/command>',
    },
    {
      header: 'Command List',
      content: [
        {
          name: 'show',
          summary:
            'Displays current battery stats. Formats like CSV or JSON are available. See --help for more info. It is a default command.',
        },
        { name: 'agent', summary: 'Controls agent process. Starts, stops and informs about current status.' },
        { name: 'history', summary: 'Outputs history of battery stats.' },
        { name: 'help', summary: 'Display this help this page.' },
      ],
    },
  ]
  console.log(commandLineUsage(sections))
}
