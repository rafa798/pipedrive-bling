const dbDriver = require('mongojs')

class Database {
  constructor ({ databaseConfig, logger }) {
    this.client = null
    this.db = null
    this.config = databaseConfig
    this.logger = logger
  }

  async connect () {
    this.db = dbDriver(this.config.uri, [], this.config.options)
  }

  disconnect () {
    if (this.client) {
      return this.client.close()
    }
  }
}

module.exports = Database
