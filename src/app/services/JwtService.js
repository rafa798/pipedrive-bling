const jwt = require('jsonwebtoken')

/**
 * Class representing the Jwt service.
 *
 * @class JwtService
 */
class JwtService {
  /**
   * Creates an instance of JwtService.
   * @memberof JwtService
   */
  constructor ({ jwtConfig }) {
    this.config = jwtConfig
  }

  _create ({ id, sub, context }) {
    const jwtPayload = {
      token: jwt.sign(
        {
          iss: this.config.issuer,
          aud: context,
          sub: sub,
          uid: id
        },
        this.config.certificate,
        { algorithm: 'RS256', expiresIn: this.config.expires }
      )
    }

    return jwtPayload
  }

  createUserToken ({ _id, emailAddress }) {
    return this._create({ id: _id, sub: emailAddress })
  }
}

module.exports = JwtService
