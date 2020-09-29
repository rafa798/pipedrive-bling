const { asValue } = require('awilix')

const container = require('../../container')
const User = require('./User')

describe('User', () => {
  let user

  beforeAll(() => {
    container.register({
      user: asValue(User)
    })

    user = container.resolve('user')
  })

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should be defined', () => {
    expect(user).toBeDefined()
  })
})
