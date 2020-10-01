const createHttpError = require('http-errors')
const UniqueConstraintException = require('../support/errors/UniqueConstraintException')
/**
 * Class representing the users service.
 *
 * @class UsersService
 */
class UsersService {
  /**
   * Creates an instance of UsersService.
   * @param {object} opts
   * @param {import('../repositories/UserRepository')} opts.userRepository
   * @param {import('../services/')} opts.userRepository
   * @memberof UsersService
   */
  constructor ({ userRepository, jwtService }) {
    this.repo = userRepository
    this.jwtService = jwtService
  }

  async findById (id) {
    return await new Promise((resolve, reject) => {
      this.repo.findById(id, (err, result) => {
        if (err) {
          reject(err)
        }

        resolve(result)
      })
    })
  }

  signup (user) {
    return new Promise((resolve, reject) => {
      this.repo.create(user, (err, result) => {
        if (err) {
          return reject(new UniqueConstraintException('An user with this email address is already registered'))
        }

        const { _id } = result
        resolve({ id: _id, isCreated: true })
      })
    })
  }

  async signin ({ emailAddress, password }) {
    const user = await new Promise((resolve, reject) => {
      this.repo.findByEmailAdrress(emailAddress, (err, result) => {
        if (err) {
          reject(err)
        }

        resolve(result)
      })
    })

    const isVerified = await this.repo.passwordVerify(password, user)
    if (!isVerified) throw createHttpError(401)

    const { token } = this.jwtService.createUserToken(user)

    return { token }
  }
}

module.exports = UsersService
