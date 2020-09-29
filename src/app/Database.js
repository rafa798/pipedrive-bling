const driver = require('mongoose')

class Database {
  constructor ({ databaseConfig, logger }) {
    this.client = null
    this.config = databaseConfig
    this.logger = logger
  }

  connect () {
    this.client = driver.connect(this.config.uri, this.config.options)
    return this.client
  }

  disconnect () {
    if (this.client) {
      return this.client.close()
    }
  }
}

module.exports = Database
