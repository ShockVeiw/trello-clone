const mongoose = require('mongoose').set('useCreateIndex', true);

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    login: {
      type: String,
      unique: true,
      required: true
    },
    password: {
      type: String,
      required: true
    }
  },
  { collection: 'users' }
);

const User = mongoose.model('User', userSchema);

function toResponse(user) {
  return {
    id: user._id,
    name: user.name,
    login: user.login
  }
}

module.exports = { User, toResponse }
