class Application {
  constructor ({ applicationConfig, httpServer, database, logger }) {
    this.config = applicationConfig
    this.httpServer = httpServer
    this.database = database
    this.logger = logger

    this.prepareToShutdown()
  }

  async start () {
    this.logger.info(
      `Application starting in ${this.config.env.toUpperCase()} mode.`
    )

    try {
      await this.database.connect()
      this.httpServer.start()
    } catch (error) {
      this.logger.error(error)
    }
  }

  async shutdown () {
    this.logger.info('Gracefully shutting down')
    this.httpServer.stop()
    await this.database.disconnect()
  }

  prepareToShutdown () {
    const signals = {
      SIGHUP: 1,
      SIGINT: 2,
      SIGTERM: 15
    }

    Object.keys(signals).forEach((signal) => {
      process.on(signal, () => {
        this.shutdown()
      })
    })
  }
}

module.exports = Application
