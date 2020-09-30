const { Router } = require('express')

class UsersService {
  constructor ({ usersService, userValidator }) {
    this.usersService = usersService
    this.validator = userValidator
  }

  get router () {
    const router = Router()

    router.post(
      '/user/signup',
      this.validator.userSignUp.bind(this.validator),
      this.userSignup.bind(this)
    )

    router.post(
      '/user/signin',
      this.validator.userSignIn.bind(this.validator),
      this.userSignin.bind(this)
    )

    return router
  }

  userSignup ({ body }, res, next) {
    return this.usersService
      .signup(body)
      .then((result) => res.status(201).send(result))
      .catch((err) => next(err))
  }

  userSignin ({ body }, res, next) {
    return this.usersService
      .signin(body)
      .then((result) => res.status(200).send(result))
      .catch((err) => next(err))
  }
}

module.exports = UsersService
