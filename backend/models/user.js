const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  userName: String,
  emailAddress: String,
  password: String,
  permissions: String,
  ratings: [{
    movieId: String,
    movieTitle: String,
    movieCover: String,
    rating: Number
  }],
  profilePicture: String,
  name: String,
  surname: String,
  birthDate: Date
});

module.exports = mongoose.model('User', userSchema);
