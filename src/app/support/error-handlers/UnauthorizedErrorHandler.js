const { Unauthorized } = require('http-errors')

class UnauthorizedErrorHandler {
  constructor () {
    this.Target = Unauthorized
  }

  handle (err, req, res) {
    res.status(401).send({ name: err.name, message: err.message })
  }
}

module.exports = UnauthorizedErrorHandler
