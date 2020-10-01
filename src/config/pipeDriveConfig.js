const pipeDriveBaseUrl = 'https://api.pipedrive.com/'
const timeout = 30000
const pipeDriveToken = process.env.PIPEDRIVE_TOKEN
const skuDefault = process.env.SKU_DEFAULT

const axiosConfig = {
  baseURL: pipeDriveBaseUrl,
  params: {
    api_token: pipeDriveToken
  },
  timeout,
  headers: { 'content-type': 'application/json' }
}

const pipeDriveConfig = {
  shippingDefault: 'Retirar no Local',
  skuDefault: skuDefault,
  apiConfig: axiosConfig
}

module.exports = () => pipeDriveConfig
