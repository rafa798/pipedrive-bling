const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const path = require('path')
const boolParser = require('express-query-boolean')

class HttpServer {
  constructor ({
    apiRouter,
    errorHandler,
    httpServerConfig,
    applicationConfig: { env },
    logger,
    loggerConfig
  }) {
    this.server = null
    this.express = express()
    this.apiRouter = apiRouter
    this.errorHandler = errorHandler
    this.config = httpServerConfig
    this.env = env
    this.logger = logger
    this.loggerLevel = loggerConfig.console.level.toUpperCase()

    this.interceptors()
    this.middlewares()
    this.routes()
    this.filters()
  }

  interceptors () {
    if (this.env !== 'test') {
      if (this.loggerLevel === 'DEBUG') {
        // @ts-ignore
        morgan.token('params', (req, res) => JSON.stringify(req.params))
        // @ts-ignore
        morgan.token('query', (req, res) => JSON.stringify(req.query))
        // @ts-ignore
        morgan.token('body', (req, res) => JSON.stringify(req.body))

        this.express.use(
          morgan(
            ':method :url :status :params :query :body :res[content-length] - :response-time ms',
            { stream: this.logger.stream }
          )
        )
      } else {
        this.express.use(morgan('tiny', { stream: this.logger.stream }))
      }
    }
  }

  middlewares () {
    this.express.disable('x-powered-by')
    this.express.use(cors({ origin: '*' }))
    this.express.use(express.json())
    this.express.use(express.urlencoded({ extended: false }))
    this.express.use(boolParser())

    // Static
    this.express.use(
      '/auth/email/confirmation',
      express.static(path.join(__dirname, '..', 'public'))
    )
  }

  routes () {
    this.express.use(this.apiRouter.router)
  }

  filters () {
    this.express.use(this.errorHandler.handle.bind(this.errorHandler))
  }

  start () {
    this.server = this.express.listen(this.config.httpServerPort, () => {
      this.logger.info(
        `Http server listening at port ${this.config.httpServerPort}.`
      )
    })
  }

  stop () {
    this.server.close()
  }
}

module.exports = HttpServer
