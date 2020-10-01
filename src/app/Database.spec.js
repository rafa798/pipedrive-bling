const { asClass } = require('awilix')

const container = require('../container')
const Database = require('./Database')

describe('Database', () => {
  let database

  beforeAll(() => {
    container.register({
      database: asClass(Database)
    })

    database = container.resolve('database')
  })

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should be defined', () => {
    expect(database).toBeDefined()
  })

  describe('method connect', () => {
    it('should be defined', () => {
      expect(database.connect).toBeDefined()
    })
  })
})
