const { Forbidden } = require('http-errors')

class ForbiddenErrorHandler {
  constructor () {
    this.Target = Forbidden
  }

  handle (err, req, res) {
    res.status(403).send(err)
  }
}

module.exports = ForbiddenErrorHandler
