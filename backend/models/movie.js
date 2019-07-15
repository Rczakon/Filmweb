const mongoose = require('mongoose');

const movieSchema = mongoose.Schema({
    title: String,
    genre: String,
    description: String,
    director: String,
    releaseDate: String,
    cover: String,
    cast: Array
});

module.exports = mongoose.model('Movie', movieSchema);
