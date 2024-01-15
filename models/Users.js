const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  user_id: {
    type: String,
  },
  user_name: {
    type: String,
  },
  last_name: {
    type: String,
  },
  user_password: {
    type: String,
  },
  user_role: {
    type: String,
    default: 'user',
  },
});

const Users = mongoose.model('users', UserSchema);

module.exports = Users;
