const optionDefinitions = [{ name: 'help', type: Boolean }]
function printUsage() {
  const commandLineUsage = require('command-line-usage')
  const sections = [
    {
      header: 'A history command',
      content: 'Display all recorder entries.',
    },
    {
      header: 'Options',
      optionList: [{ name: 'help', type: Boolean, description: 'Display this help this page.' }],
    },
  ]
  console.log(commandLineUsage(sections))
}

module.exports = {
  optionDefinitions,
  printUsage,
}
