const { Router } = require('express')

class OrderController {
  constructor ({ ordersService, jwtInterceptor }) {
    this.ordersService = ordersService
    this.jwtInterceptor = jwtInterceptor
  }

  get router () {
    const router = Router()

    router.get(
      '/order/crm',
      this.jwtInterceptor.authorize.bind(this.jwtInterceptor),
      this.createCrmOrders.bind(this)
    )

    router.get(
      '/order/report',
      this.jwtInterceptor.authorize.bind(this.jwtInterceptor),
      this.ordersReport.bind(this)
    )

    return router
  }

  createCrmOrders ({ body }, res, next) {
    return this.ordersService
      .createCrmOrders(body)
      .then((result) => res.status(201).send(result))
      .catch((err) => next(err))
  }

  ordersReport ({ body }, res, next) {
    return this.ordersService
      .ordersReport(body)
      .then((result) => res.status(200).send(result))
      .catch((err) => next(err))
  }
}

module.exports = OrderController
