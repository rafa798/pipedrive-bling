const { UnprocessableEntity } = require('http-errors')

class UnprocessableEntityExceptionHandler {
  constructor () {
    this.Target = UnprocessableEntity
  }

  handle (err, req, res) {
    res.status(422).send({ name: err.name, message: err.message })
  }
}

module.exports = UnprocessableEntityExceptionHandler
