const { ServiceUnavailable } = require('http-errors')

class ServiceUnavailableErrorHandler {
  constructor () {
    this.Target = ServiceUnavailable
  }

  handle (err, req, res) {
    res.status(503).send({ name: err.name, message: err.message })
  }
}

module.exports = ServiceUnavailableErrorHandler
