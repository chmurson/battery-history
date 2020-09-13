function formatNumber(number, options = {}) {
  if (number == null) {
    return 'n/a'
  }
  if (Number.isNaN(number)) {
    return '<error>'
  }

  let prefix = ''
  if (options.showSign) {
    if (number > -1) {
      prefix = '+'
    }
  }

  return prefix + number
}

module.exports = {
  formatNumber,
}
