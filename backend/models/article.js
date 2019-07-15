const mongoose = require('mongoose');

const articleSchema = mongoose.Schema({
    articleTitle: String,
    description: String,
    imagePath: String
});

module.exports = mongoose.model('Article', articleSchema);
