const createHttpError = require('http-errors')

const userSignUpSchema = {
  properties: {
    body: {
      type: 'object',
      required: [
        'firstName',
        'lastName',
        'emailAddress',
        'password'
      ],
      additionalProperties: false,
      properties: {
        firstName: {
          type: 'string',
          minLength: 2,
          maxLength: 256
        },
        lastName: {
          type: 'string',
          minLength: 2,
          maxLength: 256
        },
        emailAddress: {
          type: 'string',
          format: 'email'
        },
        password: {
          type: 'string',
          minLength: 4,
          maxLength: 256
        }
      }
    }
  }
}

class UserValidator {
  constructor ({ ajv }) {
    this.ajv = ajv
  }

  validate (schema, req, next) {
    const validate = this.ajv.compile(schema)

    if (!validate(req)) {
      return next(createHttpError(400, { message: validate.errors }))
    }

    return next()
  }

  userSignUp (req, res, next) {
    return this.validate(userSignUpSchema, req, next)
  }
}

module.exports = UserValidator
