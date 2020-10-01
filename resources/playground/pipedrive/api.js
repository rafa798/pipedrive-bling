const axios = require('axios')

const api = axios.default.create({
  baseURL: 'https://api.pipedrive.com/v1',
  headers: {
    'Content-type': 'application/json'
  }
})

api.defaults.params = {
  api_token: 'token'
}

api
  .get('/deals', {})
  .then((r) => {
    console.log(r.data)
  })
