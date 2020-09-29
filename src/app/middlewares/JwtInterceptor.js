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
  constructor ({ jwtConfig, usersService, cmsUsersService }) {
    this.config = jwtConfig
    this.usersService = usersService
    this.cmsUsersService = cmsUsersService
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
      const { uid, aud } = this.verify(token)

      const regEx = new RegExp(`^\/(${aud}|\\*)\/`)

      if (!req.path.match(regEx)) {
        return next(
          createHttpError(403, 'You have no access to this resource')
        )
      }

      const user =
        aud === 'customers'
          ? await this.usersService.findOne({ id: uid })
          : await this.cmsUsersService.findOne({ id: uid })

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
