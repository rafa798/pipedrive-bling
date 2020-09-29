const { Router } = require('express')

class ApiRouter {
  constructor ({ controllers }) {
    this.router = Router()
    this.controllers = controllers

    this.loadRoutes()
  }

  loadRoutes () {
    this.controllers.forEach((controller) => {
      this.router.use(controller.router)
    })
  }
}

module.exports = ApiRouter
