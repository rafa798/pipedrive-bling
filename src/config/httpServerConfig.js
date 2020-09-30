const env = process.env.NODE_ENV || 'development'

const httpServerPort = process.env.PORT
const httpServerConfig = { httpServerPort, env }

module.exports = () => httpServerConfig
