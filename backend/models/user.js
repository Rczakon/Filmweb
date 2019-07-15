const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  userName: String,
  emailAddress: String,
  password: String,
  permissions: String
});

module.exports = mongoose.model('User', userSchema);
