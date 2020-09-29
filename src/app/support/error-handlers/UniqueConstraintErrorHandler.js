const UniqueConstraintException = require('../errors/UniqueConstraintException')

class UniqueConstraintExceptionHandler {
  constructor () {
    this.Target = UniqueConstraintException
  }

  handle (err, req, res) {
    res.status(422).send({ name: err.name, message: err.message })
  }
}

module.exports = UniqueConstraintExceptionHandler
