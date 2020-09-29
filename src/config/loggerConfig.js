const loggerLevel = process.env.LOGGER_CONSOLE_LEVEL || 'INFO'
const loggerColorize = process.env.LOGGER_CONSOLE_COLORIZE || 'NO'

const loggerConfig = {
  console: {
    level: loggerLevel.toLowerCase(),
    colorize: loggerColorize.toLocaleLowerCase() === 'yes'
  }
}

module.exports = () => loggerConfig
