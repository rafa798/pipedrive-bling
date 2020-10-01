const axios = require('axios')
const createHttpError = require('http-errors')
const js2xml = require('js2xmlparser')
const { of } = require('rxjs')
const { mergeMap, map, retry, catchError, delay } = require('rxjs/operators')

/**
 * Class representing the BlingService service.
 *
 * @class BlingService
 */
class BlingService {
  /**
   * Creates an instance of BlingService.
   *
   * @memberof BlingService
   */
  constructor ({ blingConfig, logger }) {
    this.apiConfig = blingConfig
    this.logger = logger

    this.init()
  }

  init () {
    this.api = axios.default.create(this.apiConfig)
  }

  /**
   * Default call to Bling.
   *
   * @param {import('axios').AxiosRequestConfig} opts
   * @returns {*} data
   * @memberof BlingService
   */
  request (opts) {
    return of(opts)
      .pipe(
        delay(500),
        mergeMap((x) => this.api(x)),
        retry(1),
        catchError((err) => {
          this.logger.warn('error when calling Bling')
          this.logger.error(err.message)
          throw createHttpError(
            503,
            'Failure communicating with Bling'
          )
        }),
        map((x) => x.data)
      )
      .toPromise()
  }

  orderCreate (order) {
    return this.request({
      method: 'post',
      url: '/v2/pedido/json',
      params: {
        xml: js2xml.parse('pedido', order)
      }
    }).then((data) => data.retorno.pedidos[0].pedido)
  }
}

module.exports = BlingService
