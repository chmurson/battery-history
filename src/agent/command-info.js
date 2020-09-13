const optionDefinitions = [{ name: 'command', defaultOption: true }]

function printUsage() {
  const commandLineUsage = require('command-line-usage')
  const sections = [
    {
      header: 'An agent command',
      content: 'Controls agent process. Starts, stops informs about current stats.',
    },
    {
      header: 'Synopsis',
      content: '$ app <command> <option/command>',
    },
    {
      header: 'Command List',
      content: [
        {
          name: 'status',
          summary: 'Displays whether agent is loaded or not.',
        },
        { name: 'load', summary: 'Loads agent.' },
        { name: 'unload', summary: 'Unloads agent.' },
      ],
    },
  ]

  console.log(commandLineUsage(sections))
}

module.exports = {
  printUsage,
  optionDefinitions,
}
