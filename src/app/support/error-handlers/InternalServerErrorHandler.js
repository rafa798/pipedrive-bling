const { InternalServerError } = require('http-errors')

class InternalServerErrorHandler {
  constructor () {
    this.Target = InternalServerError
  }

  handle (err, req, res) {
    const errorInstance = new this.Target()

    res.status(500).send({
      name: errorInstance.name,
      message: 'Sorry, but We could not process your request right now. Please, try again later. If the issue persists, consider get in touch with the support team.'
    })
  }
}

module.exports = InternalServerErrorHandler
