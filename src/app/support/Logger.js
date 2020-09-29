const winston = require('winston')

class Logger {
  constructor ({ loggerConfig }) {
    this.config = loggerConfig
    this.logger = null

    this.init()
  }

  init () {
    this.logger = winston.createLogger({
      transports: [
        new winston.transports.Console({
          level: this.config.console.level,
          handleExceptions: true,
          format: this.consoleFormat
        })
      ],
      exitOnError: false
    })
  }

  get stream () {
    return {
      write: (message, encoding) => {
        this.logger.info(message)
      }
    }
  }

  get consoleFormat () {
    return winston.format.combine(
      winston.format((info) => {
        info.level = info.level.toUpperCase()
        return info
      })(),

      this.config.console.colorize
        ? winston.format.colorize()
        : winston.format.uncolorize(),

      winston.format.timestamp(),

      winston.format.align(),

      winston.format.printf(
        (info) => `${info.timestamp} ${info.level}: ${info.message.trim()}`
      )
    )
  }

  _parseMessage (message) {
    return typeof message === 'string' ? message : JSON.stringify(message)
  }

  error (message) {
    this.logger.error(this._parseMessage(message))
  }

  warn (message) {
    this.logger.warn(this._parseMessage(message))
  }

  info (message) {
    this.logger.info(this._parseMessage(message))
  }

  http (message) {
    this.logger.http(this._parseMessage(message))
  }

  verbose (message) {
    this.logger.verbose(this._parseMessage(message))
  }

  debug (message) {
    this.logger.debug(this._parseMessage(message))
  }

  silly (message) {
    this.logger.silly(this._parseMessage(message))
  }
}

module.exports = Logger
