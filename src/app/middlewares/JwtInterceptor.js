const jwt = require('jsonwebtoken')
const createHttpError = require('http-errors')

/**
 * Class representing the Jwt interceptor.
 *
 * @class JwtInterceptor
 */
class JwtInterceptor {
  /**
   *Creates an instance of JwtInterceptor.
   * @memberof JwtInterceptor
   */
  constructor ({ jwtConfig, usersService }) {
    this.config = jwtConfig
    this.usersService = usersService
  }

  verify (token) {
    return jwt.verify(token, this.config.key, {
      algorithms: ['RS256'],
      issuer: this.config.issuer
    })
  }

  /**
   * The authorize method.
   *
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   * @param {import('express').NextFunction} next
   * @memberof JwtInterceptor
   */
  async authorize (req, res, next) {
    try {
      const [, token] = req.header('Authorization').split(' ')
      /** @type import('../../types/jwt-payload.d').JwtPayload */
      // @ts-ignore
      const { uid } = this.verify(token)

      if (!uid) {
        return next(
          createHttpError(401)
        )
      }

      const user = await this.usersService.findById(uid)

      if (!user) return next(createHttpError(401, 'Unauthorized'))

      // @ts-ignore
      req.user = user

      next()
    } catch (error) {
      if (error instanceof createHttpError.Forbidden) { return next(createHttpError(403, error.message)) }

      return next(createHttpError(401, 'Unauthorized'))
    }
  }
}

module.exports = JwtInterceptor
