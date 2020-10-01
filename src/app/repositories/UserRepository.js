const bcrypt = require('bcryptjs')
const { ObjectId } = require('mongojs')

class UserRepository {
  constructor ({ User }) {
    this.User = User
  }

  create (user, callback) {
    user.password = this.hashPassowrd(user.password)
    return this.User.collection.insert(user, callback)
  }

  findByEmailAdrress (emailAddress, callback) {
    return this.User.collection.findOne({ emailAddress: emailAddress }, callback)
  }

  findById (id, callback) {
    return this.User.collection.findOne({ _id: ObjectId(id) }, callback)
  }

  hashPassowrd (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync())
  }

  passwordVerify (password, user) {
    return bcrypt.compare(password, user.password)
  }
}

module.exports = UserRepository
