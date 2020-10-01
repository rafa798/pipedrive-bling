
class User {
  constructor ({ database, orderSchema }) {
    this.name = 'orders'
    this.database = database
    this.schema = orderSchema
  }

  get collection () {
    this.database.db.runCommand({
      collMod: this.name,
      validator: {
        $jsonSchema: this.schema
      },
      validationLevel: 'strict'
    })

    const collection = this.database.db.collection(this.name)
    collection.createIndex({ numero_loja: 1 }, { unique: true })

    return this.database.db.collection(this.name)
  }
}

module.exports = User
