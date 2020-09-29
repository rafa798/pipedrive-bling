const env = process.env.NODE_ENV || 'development'
const mobileAppVersion = process.env.MOBILE_APP_VERSION

const applicationConfig = { env, mobileAppVersion }

module.exports = () => applicationConfig
