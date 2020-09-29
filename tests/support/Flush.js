class Flush {
  constructor ({ database }) {
    this.database = database
  }

  execute () {
    return this.database.dropDatabase()
  }
}

module.exports = Flush
