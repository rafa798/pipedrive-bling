const { NotFound } = require('http-errors')

class NotFoundErrorHandler {
  constructor () {
    this.Target = NotFound
  }

  handle (err, req, res) {
    res.status(404).send({ name: err.name, message: err.message })
  }
}

module.exports = NotFoundErrorHandler
