// const faker = require('faker')
const { asClass } = require('awilix')

const container = require('../../container')
const PipeDriveService = require('./PipeDriveService')

describe('PipeDriveService', () => {
  /** @type {import('./PipeDriveService')} */
  let service

  beforeAll(() => {
    container.register({
      pipeDriveService: asClass(PipeDriveService).singleton()
    })

    service = container.resolve('pipeDriveService')
  })

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  describe('Method init', () => {
    it('api default should be created', () => {
      expect(service.api.defaults).toBeDefined()
    })
  })

  describe('Method getWonDeals', () => {
    it('should be defined', () => {
      expect(service.getWonDeals).toBeDefined()
    })

    it('should list won deals', async () => {
      const orders = await service.getWonDeals()
      expect(orders.length > 0).toBe(true)
    })
  })
})
