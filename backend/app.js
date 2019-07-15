const express = require('express');
const mongoose = require("mongoose");
const app = express();
const Movie = require('./models/movie');
const Article = require('./models/article')
const User = require('./models/user')
const bodyParser = require('body-parser');

// app.use(bodyParser);


// app.use(function(req, res, next) {
//   console.log("Server running");
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   header.Add("Access-Control-Allow-Origin", "*");
//   header.Add("Access-Control-Allow-Methods", "DELETE, POST, GET, OPTIONS");
//   header.Add("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
//   next();
// });

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers",
  "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader("Access-Control-Allow-Methods",
  "DELETE, POST, GET, OPTIONS"
  );
})

// RmMd8HtoFwBsrjAt

mongoose.connect("mongodb+srv://admin:RmMd8HtoFwBsrjAt@cluster0-aek9u.mongodb.net/filmweb-database?retryWrites=true&w=majority")
  .then(() => {
    console.log("Connected to database!");
  })
  .catch(() => {
    console.log("Connection failed");
  });

  app.post("/add-test", (req, res, next) => {
    const testMovie = new Movie({
      title: "Testowy film",
      genre: "Testowy",
      description: "Testerowy film testowy",
      director: "Hector",
      releaseDate:"Nigdy",
      cover: "https://www.valmorgan.com.au/wp-content/uploads/2016/06/default-movie-1-3.jpg",
      cast: "nic"
    });
    testMovie.save();
    res.status(201).json({
      message: "Test movie added sucessfully!"
    });
  })


const movies = [];

app.use('/get-movies-list', (req, res, next) => {
  Movie.find()
    .then(documents => {
      console.log(documents);
      const serverMessage = "Pomyślnie pobrano listę filmów";
      res.json({
        'message': serverMessage,
        movies: documents
      });
    });
});


app.use('/get-article-list', (req, res, next) => {
  Article.find()
    .then(documents => {
      console.log(documents);
      const serverMessage = "Pomyślnie pobrane listę artykułów";
      res.json({
        'message': serverMessage,
        articles: documents
      });
    });
});

app.use('/get-single-movie/:movieId', (req, res, next) => {
  const searchedId = req.params.movieId;
  // const searchedId = "5d0931751c9d44000030a696";
  Movie.findById(req.params.movieId)
    .then(document => {
      console.log(document);
      res.status(201).json({
        message: document
      });
      res.json({
        movie: document
      });
    });
});

app.use('/get-single-article/:articleId', (req, res, next) => {
  const searchedId = req.params.articleId;
  // const searchedId = "5d0931751c9d44000030a696";
  Article.findById(req.params.articleId)
    .then(document => {
      console.log(document);
      res.status(201).json({
        message: document
      });
      res.json({
        article: document
      });
    });

    // app.post('/add-user', (req, res, next) => {
    //   // const newUser = new User({
    //   //   userName: req.body.username,
    //   //   emailAddress: req.body.emailAddress,
    //   //   password: req.body.password
    //   // });
    //   console.log(req.body);

    //   res.status(201).json({
    //     message: "It worked!"
    //   })
    // });
});

module.exports = app;
