const bcrypt = require('bcryptjs')

class UserRepository {
  constructor ({ User, userValidator }) {
    this.User = User
    this.userValidator = userValidator
  }

  create (user, callback) {
    user.password = this.hashPassowrd(user.password)
    this.User.collection.insert(user, callback)
  }

  findByEmailAdrress (emailAddress, callback) {
    return this.User.collection.findOne({ emailAddress: emailAddress }, callback)
  }

  hashPassowrd (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync())
  }

  passwordVerify (password, user) {
    return bcrypt.compare(password, user.password)
  }
}

module.exports = UserRepository
