const fs = require('fs')
const path = require('path')

const jwtConfig = {
  certificate: process.env.JWT_CERT
    ? Buffer.from(process.env.JWT_CERT, 'utf8')
    : fs.readFileSync(
      path.join(
        __dirname,
        '..',
        '..',
        'resources',
        'keys',
        'jwt',
        'jwt.cert'
      )
    ),
  key: process.env.JWT_KEY
    ? Buffer.from(process.env.JWT_KEY, 'utf8')
    : fs.readFileSync(
      path.join(__dirname, '..', '..', 'resources', 'keys', 'jwt', 'jwt.key')
    ),
  expires: process.env.JWT_EXPIRES || '1d',
  issuer: 'jhsf-pay/auth'
}

module.exports = () => jwtConfig
