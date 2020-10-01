const blingBaseUrl = 'https://bling.com.br/Api'
const blingToken = process.env.BLING_TOKEN

const blingConfig = {
  baseURL: blingBaseUrl,
  headers: { 'content-type': 'application/xml' },
  params: {
    apikey: blingToken
  }
}

module.exports = () => blingConfig
