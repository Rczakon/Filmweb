const mongoose = require('mongoose');

const sessionSchema = mongoose.Schema({
  sessionId: String,
  userName: String,
  userId: String
});

module.exports = mongoose.model('Session', sessionSchema);
