const Youch = require('youch')
const forTerminal = require('youch-terminal')

class ErrorHandler {
  constructor ({
    errorHandlers,
    defaultErrorHandler,
    httpServerConfig,
    logger
  }) {
    this.errorHandlers = errorHandlers
    this.defaultErrorHandler = defaultErrorHandler
    this.env = httpServerConfig.env
    this.logger = logger.logger
  }

  handle (err, req, res, next) {
    if (res.headersSent) {
      return next(err)
    }

    if (err.validation) {
      res.send(err)
    } else {
      const handler = this.findHandler(err) || this.defaultErrorHandler

      handler.handle(err, req, res, next)

      if (this.env === 'development') {
        this.youtchToConsole(err, req)
      } else {
        this.logger.error(err)
      }
    }
  }

  findHandler (err) {
    const list = this.errorHandlers
    return list.find((h) => this.isInstanceOf(err, h) || (err.code === h.code && h.code !== undefined))
  }

  isInstanceOf (err, h) {
    return h.Target ? err instanceof h.Target : false
  }

  youtchToConsole (err, req) {
    new Youch(err, req).toJSON().then((output) => {
      this.logger.error(forTerminal(output))
    })
  }
}

module.exports = ErrorHandler
