const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
  userId: String,
  userName: String,
  movieId: String,
  articleId: String,
  content: String
});

module.exports = mongoose.model('Comment', commentSchema);
