const commandLineUsage = require('command-line-usage')
const sections = [
  {
    header: 'Battery History',
    content: 'Tracks and stores information about battery throughout time',
  },
  {
    header: 'Options',
    optionList: [
      {
        name: 'hello world',
        typeLabel: '{underline file}',
        description: 'this is some stuff herea',
      },
    ],
  },
]

function printUsage() {
  console.log(commandLineUsage(sections))
}

module.exports = {
  printUsage,
}
