const { of, from } = require('rxjs')
const { mergeMap, map, toArray, catchError } = require('rxjs/operators')
const UniqueConstraintException = require('../support/errors/UniqueConstraintException')
/**
 * Class representing the OrdersService service.
 *
 * @class OrdersService
 */
class OrdersService {
  /**
   * Creates an instance of OrdersService.
   *

   * @param {object} opts
   * @param {import('../repositories/OrderRepository')} opts.orderRepository
   * @param {import('./PipeDriveService')} opts.pipeDriveService
   * @param {import('./BlingService')} opts.blingService
   * @param {import('../support/Logger')} opts.logger
   * @memberof OrdersService
   */
  constructor ({ orderRepository, pipeDriveService, blingService, logger }) {
    this.repo = orderRepository
    this.pipeDriveService = pipeDriveService
    this.blingService = blingService
    this.logger = logger
  }

  async createOrder (order) {
    return new Promise((resolve, reject) => {
      this.repo.create(order, (err, result) => {
        if (err) {
          reject(new UniqueConstraintException(
            'An order with this `numero_loja` is already registered'
          ))
        }

        resolve(result)
      })
    })
  }

  async ordersReport (order) {
    return new Promise((resolve, reject) => {
      this.repo.report((err, result) => {
        if (err) {
          reject(err)
        }

        resolve(result)
      })
    })
  }

  async createCrmOrders () {
    const deals = await this.pipeDriveService.getWonDeals()
    return from(deals)
      .pipe(
        mergeMap((deal) =>
          of(deal).pipe(
            mergeMap((x) => this.blingService.orderCreate(x)),
            map((x) => ({
              numero_loja: deal.numero_loja,
              codigo: deal.item.codigo,
              qtde: deal.item.qtde,
              valor: deal.item.vlr_unit,
              cliente: deal.cliente,
              volume: deal.volume,
              data: deal.data,
              numero: x.numero,
              idPedido: x.idPedido
            })),
            mergeMap((x) => this.createOrder(x)),
            map((x) => ({ codigo: x.codigo, succeeded: true, ...x })),
            catchError((err) => of({ succeeded: false, ...err }))
          )
        ),
        toArray(),
        map((x) => {
          const total = x.length
          // @ts-ignore
          const succeeded = x.filter((t) => t.succeeded)
          const totalSucceeded = succeeded.length
          // @ts-ignore
          const failed = x.filter((t) => !t.succeeded)
          const totalFailed = failed.length

          return {
            total,
            succeeded: totalSucceeded,
            failed: totalFailed,
            results: { succeeded, failed }
          }
        })
      )
      .toPromise()
  }
}

module.exports = OrdersService
