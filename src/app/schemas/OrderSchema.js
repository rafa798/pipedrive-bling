const OrderSchema = {
  bsonType: 'object',
  required: ['numero_loja', 'volume', 'numeroLoja', 'data', 'cliente'],
  properties: {
    numeroLoja: {
      bsonType: 'string'
    },
    idPedido: {
      bsonType: 'int'
    },
    codigo: {
      bsonType: 'string'
    },
    volume: {
      bsonType: 'object',
      required: ['servico'],
      properties: {
        servico: {
          bsonType: 'string'
        }
      }
    },
    qtde: {
      bsonType: 'int'
    },
    valor: {
      bsonType: 'decimal'
    },
    data: {
      bsonType: 'date'
    }
  }
}

module.exports = () => OrderSchema
