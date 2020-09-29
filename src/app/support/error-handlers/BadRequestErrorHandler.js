const { BadRequest } = require('http-errors')

class BadRequestErrorHandler {
  constructor () {
    this.Target = BadRequest
  }

  handle (err, req, res) {
    res.status(400).send({ name: err.name, message: err.message })
  }
}

module.exports = BadRequestErrorHandler
