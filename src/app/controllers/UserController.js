const { Router } = require('express')

class UsersService {
  constructor ({ usersService, userValidator }) {
    this.service = usersService
    this.validator = userValidator
  }

  get router () {
    const router = Router()

    router.post(
      '/user/signup',
      this.validator.userSignUp.bind(this.validator),
      this.userSignup.bind(this)
    )

    return router
  }

  userSignup ({ body }, res, next) {
    return this.service
      .usersSignUp(body)
      .then((result) => res.status(201).send(result))
      .catch((err) => next(err))
  }
}

module.exports = UsersService
