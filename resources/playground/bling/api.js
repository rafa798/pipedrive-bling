const axios = require('axios')
const js2xml = require('js2xmlparser')

const api = axios.default.create({
  baseURL: 'https://bling.com.br/Api',
  headers: {
    'Content-type': 'application/xml'
  },
  params: {
    apikey: 'key'
  }
})

const pedido = {
  cliente: {
    nome: 'Rafael Oliveira'
  },
  volume: {
    servico: 'Retirar no local'
  },
  item: {
    codigo: '10001',
    qtde: 1,
    vlr_unit: 1055.88
  }
}

const xmlPedido = js2xml.parse('pedido', pedido)

// console.log(xmlPedido)
api({
  method: 'post',
  url: '/v2/pedido/json',
  params: {
    xml: xmlPedido
  }
}).then((r) => {
  console.log(JSON.stringify(r.data))
})
