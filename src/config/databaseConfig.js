const path = require('path')

require('dotenv').config({
  path: path.resolve(__dirname, '..', '..', '.env')
})

const host = process.env.DB_HOST
const user = process.env.DB_USER
const pwd = process.env.DB_PASSWORD
const db = process.env.DB_NAME
const nup = process.env.DB_NEW_URL_PARSER || 'NO'
const ci = process.env.DB_CREATE_INDEX || 'NO'
const ut = process.env.DB_UNIFIED_TOPOLOGY || 'NO'

//
//
const databaseConfig = {
  uri: `mongodb+srv://${user}:${pwd}@${host}/${db}?retryWrites=true&w=majority`,
  options: {
    useNewUrlParser: nup.toLocaleLowerCase() === 'yes',
    useCreateIndex: ci.toLocaleLowerCase() === 'yes',
    useUnifiedTopology: ut.toLocaleLowerCase() === 'yes'
  }
}

module.exports = () => databaseConfig
