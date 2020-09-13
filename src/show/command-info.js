const optionDefinitions = [
  { name: 'csv', type: Boolean },
  { name: 'header', type: Boolean },
  { name: 'header-only', type: Boolean },
  { name: 'json', type: Boolean },
  { name: 'help', type: Boolean },
]

function printUsage() {
  const commandLineUsage = require('command-line-usage')
  const sections = [
    {
      header: 'A show command',
      content: 'Displays current battery stats in various formats.',
    },
    {
      header: 'Options',
      optionList: [
        { name: 'help', type: Boolean, description: 'Display this help this page.' },
        { name: 'csv', type: Boolean, description: 'Outputs in CSV format.' },
        { name: 'json', type: Boolean, description: 'Outputs in JSON format.' },
      ],
    },
    {
      header: 'Extra options for --csv',
      optionList: [
        {
          name: 'header',
          type: Boolean,
          description: 'Displays header with cell labels.',
        },
        {
          name: 'header-only',
          type: Boolean,
          description: 'Displays only header, omits data.',
        },
      ],
    },
  ]
  console.log(commandLineUsage(sections))
}

module.exports = {
  printUsage,
  optionDefinitions,
}
