// DI resolver imports
const {
  createContainer,
  asClass,
  asValue,
  Lifetime,
  asFunction
} = require('awilix')

// Third party dependencies
const Ajv = require('ajv')

// Support imports
const asArray = require('./app/support/di/resolvers/asArray')
const Logger = require('./app/support/Logger')

// Application imports
const Application = require('./app/Application')
const HttpServer = require('./app/HttpServer')
const ApiRouter = require('./app/ApiRouter')
const ErrorHandler = require('./app/ErrorHandler')
const Database = require('./app/Database')

// Controllers imports
// const AuthController = require('./app/controllers/AuthController')
// const UploadsController = require('./app/controllers/UploadsController')
// const TransactionsController = require('./app/controllers/TransactionsController')
// const CustomerPointsController = require('./app/controllers/CustomerPointsController')
// const CardsController = require('./app/controllers/CardsController')
// const ProfilesController = require('./app/controllers/ProfilesController')
// const StoresController = require('./app/controllers/StoresController')

// Error handlers imports
const BadRequestErrorHandler = require('./app/support/error-handlers/BadRequestErrorHandler')
const UnauthorizedErrorHandler = require('./app/support/error-handlers/UnauthorizedErrorHandler')
const UniqueConstraintErrorHandler = require('./app/support/error-handlers/UniqueConstraintErrorHandler')
const ServiceUnavailableErrorHandler = require('./app/support/error-handlers/ServiceUnavailableErrorHandler')
const InternalServerErrorHandler = require('./app/support/error-handlers/InternalServerErrorHandler')
const ForbiddenErrorHandler = require('./app/support/error-handlers/ForbiddenErrorHandler')
const NotFoundErrorHandler = require('./app/support/error-handlers/NotFoundErrorHandler')
const UnprocessableEntityErrorHandler = require('./app/support/error-handlers/UnprocessableEntityErrorHandler')

// Container creation
const container = createContainer()

// Application injection
container.register({
  application: asClass(Application).singleton(),
  httpServer: asClass(HttpServer).singleton(),
  apiRouter: asClass(ApiRouter).singleton(),
  errorHandler: asClass(ErrorHandler).singleton(),
  database: asClass(Database).singleton()
})

// Configs injection
container.loadModules(['src/config/*.js'], {
  formatName: 'camelCase',
  resolverOptions: {
    register: asFunction,
    lifetime: Lifetime.SINGLETON
  }
})

// Middlewares injection
container.loadModules(['src/app/middlewares/**/!(*.spec).js'], {
  formatName: 'camelCase',
  resolverOptions: {
    register: asClass,
    lifetime: Lifetime.SINGLETON
  }
})

// Controllers injection
// container.register({
//   controllers: asArray([
//     asClass(AuthController).singleton(),
//     asClass(UploadsController).singleton(),
//     asClass(TransactionsController).singleton(),
//     asClass(CustomerPointsController).singleton(),
//     asClass(CardsController).singleton(),
//     asClass(ProfilesController).singleton(),
//     asClass(StoresController).singleton()
//   ])
// })

// Services injection
container.loadModules(['src/app/services/!(*.spec).js'], {
  formatName: 'camelCase',
  resolverOptions: {
    register: asClass,
    lifetime: Lifetime.SINGLETON
  }
})

// Models injection
container.loadModules(['src/app/models/**/!(*.spec).js'], {
  resolverOptions: {
    register: asValue,
    lifetime: Lifetime.SINGLETON
  }
})

// Error handlers injection
container.register({
  errorHandlers: asArray([
    asClass(BadRequestErrorHandler).singleton(),
    asClass(UnauthorizedErrorHandler).singleton(),
    asClass(UniqueConstraintErrorHandler).singleton(),
    asClass(NotFoundErrorHandler).singleton(),
    asClass(ForbiddenErrorHandler).singleton(),
    asClass(ServiceUnavailableErrorHandler).singleton(),
    asClass(UnprocessableEntityErrorHandler).singleton()
  ]),
  defaultErrorHandler: asClass(InternalServerErrorHandler).singleton()
})

// Third party dependencies injection
container.register({
  ajv: asValue(new Ajv({ allErrors: true, format: 'full' }))
})

// Support injection
container.register({
  logger: asClass(Logger).singleton()
})

module.exports = container
