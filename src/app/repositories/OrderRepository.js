class OrderRepository {
  constructor ({ Order }) {
    this.Order = Order
  }

  create (order, callback) {
    return this.Order.collection.insert(order, callback)
  }

  report (callback) {
    return this.Order.collection.aggregate([{
      $group: {
        _id: '$data',
        total: {
          $sum: '$valor'
        }
      }
    }], callback)
  }
}

module.exports = OrderRepository
