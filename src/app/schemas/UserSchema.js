const UserSchema = {
  bsonType: 'object',
  required: ['firstName', 'lastName', 'emailAddress', 'password'],
  properties: {
    firstName: {
      bsonType: 'string'
    },
    lastName: {
      bsonType: 'string'
    },
    emailAddress: {
      bsonType: 'string'
    },
    password: {
      bsonType: 'string'
    }
  }
}

module.exports = () => UserSchema
