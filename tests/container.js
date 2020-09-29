const { asClass } = require('awilix')

const container = require('../src/container')
const Logger = require('./support/Logger')
const Flush = require('./support/Flush')

container.register({
  logger: asClass(Logger).singleton(),
  flush: asClass(Flush).singleton()
})

module.exports = container
