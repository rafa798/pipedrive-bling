const mongoose = require('mongoose')
const { Schema } = mongoose

const UserSchema = new Schema({
  name: { type: 'string' },
  email: { type: 'string', unique: true },
  password: { type: 'string' }
}, { timestamps: true })

module.exports = mongoose.model('User', UserSchema)
