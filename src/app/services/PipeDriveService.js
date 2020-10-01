const axios = require('axios')
const createHttpError = require('http-errors')
const { of } = require('rxjs')
const { mergeMap, map, retry, catchError } = require('rxjs/operators')

/**
 * Class representing the PipeDriveService service.
 *
 * @class PipeDriveService
 */
class PipeDriveService {
  /**
   * Creates an instance of PipeDriveService.
   *
   * @memberof PipeDriveService
   */
  constructor ({ pipeDriveConfig, logger }) {
    this.config = pipeDriveConfig
    this.logger = logger

    this.init()
  }

  init () {
    this.api = axios.default.create(this.config.apiConfig)
  }

  /**
   * Default call to PipeDrive.
   *
   * @param {import('axios').AxiosRequestConfig} opts
   * @returns {*} data
   * @memberof PipeDriveService
   */
  request (opts) {
    return of(opts)
      .pipe(
        mergeMap((x) => this.api(x)),
        retry(1),
        catchError((err) => {
          this.logger.warn('error when calling Pipedrive')
          this.logger.error(err.message)
          throw createHttpError(
            503,
            'Failure communicating with Pipedrive server'
          )
        }),
        map((x) => x.data)
      )
      .toPromise()
  }

  getWonDeals () {
    return this.request({
      method: 'GET',
      url: '/v1/deals',
      data: {
        status: 'won'
      }
    }).then((x) => x.data.map((it) => {
      return {
        numero_loja: it.id,
        cliente: {
          nome: it.person_id.name
        },
        volume: {
          servico: this.config.shippingDefault
        },
        data: this.enToBrDate(it.won_time),
        item: {
          codigo: this.config.skuDefault,
          qtde: 1,
          vlr_unit: it.value
        }
      }
    }
    ))
  }

  enToBrDate (dt) {
    const [y, m, d] = dt.split(' ')[0].split('-')
    return `${d}/${m}/${y}`
  }
}

module.exports = PipeDriveService
