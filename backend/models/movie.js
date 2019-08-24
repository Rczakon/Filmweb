const mongoose = require('mongoose');

const movieSchema = mongoose.Schema({
    title: String,
    genre: String,
    description: String,
    director: String,
    releaseDate: String,
    cover: String,
    cast: Array,
    ratings: {
      rating1: Number,
      rating2: Number,
      rating3: Number,
      rating4: Number,
      rating5: Number
    },
    averageRating: Number,
    comments: [{
      userId: String,
      userName: String,
      content: String
    }]
});

module.exports = mongoose.model('Movie', movieSchema);
