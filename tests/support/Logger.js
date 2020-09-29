class Logger {
  get stream () {
    return { write: () => {} }
  }

  error () {}
  warn () {}
  info () {}
  http () {}
  verbose () {}
  debug () {}
  silly () {}
}

module.exports = Logger
