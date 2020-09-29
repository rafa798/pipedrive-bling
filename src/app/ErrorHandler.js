const Youch = require('youch')
const forTerminal = require('youch-terminal')

class ErrorHandler {
  constructor ({
    errorHandlers,
    defaultErrorHandler,
    applicationConfig,
    logger
  }) {
    this.errorHandlers = errorHandlers
    this.defaultErrorHandler = defaultErrorHandler
    this.env = applicationConfig.env
    this.logger = logger
  }

  handle (err, req, res, next) {
    const handler =
      this.errorHandlers.find((h) => err instanceof h.Target) ||
      this.defaultErrorHandler

    handler.handle(err, req, res, next)

    if (this.env === 'development') {
      this.youtchToConsole(err, req)
    } else {
      this.logger.error(err.name, err.message, err.stack)
    }
  }

  youtchToConsole (err, req) {
    new Youch(err, req).toJSON().then((output) => {
      this.logger.error(forTerminal(output))
    })
  }
}

module.exports = ErrorHandler
