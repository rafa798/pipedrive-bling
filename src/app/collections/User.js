
class User {
  constructor ({ database, userSchema }) {
    this.name = 'users'
    this.database = database
    this.userSchema = userSchema
  }

  get collection () {
    this.database.db.runCommand({
      collMod: this.name,
      validator: {
        $jsonSchema: this.userSchema
      },
      validationLevel: 'strict'
    })

    const collection = this.database.db.collection(this.name)
    collection.createIndex({ emailAddress: 1 }, { unique: true })

    return this.database.db.collection(this.name)
  }
}

module.exports = User
