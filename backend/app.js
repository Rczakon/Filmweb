const express = require('express');
const mongoose = require("mongoose");
const app = express();
const Movie = require('./models/movie');
const Comment = require('./models/comment');
const Article = require('./models/article');
const User = require('./models/user');
const Session = require('./models/session');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');


app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


// session = {
//   loggedUserId: null,
//   loggedUserName: null
// };



app.use(cookieParser());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers",
  "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader("Access-Control-Allow-Methods",
  "DELETE, POST, GET, OPTIONS"
  );
  next();
})

mongoose.connect("mongodb+srv://admin:RmMd8HtoFwBsrjAt@cluster0-aek9u.mongodb.net/filmweb-database?retryWrites=true&w=majority")
  .then(() => {
    console.log("Connected to database!");
  })
  .catch(() => {
    console.log("Connection failed");
  });

  //   app.use("/", (req, res, next) => {
  //   res.status(201).json({
  //     message: "Works!"
  //   });
  //   next();
  // })

// RmMd8HtoFwBsrjAt

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
    next();
  });


app.post("/add-article", (req, res, next) => {
  const receivedArticle = req.body;
  const newArticle = new Article({
    articleTitle: receivedArticle.articleTitle,
    description: receivedArticle.articleContent,
    imagePath: receivedArticle.articleCover
  });
  newArticle.save();
  res.status(201).json({
    message: "Successfully sent article data!"
  });
});

app.post("/get-rating", (req, res, next) => {
  let movieIds = [];
  let receivedRating;
  const receivedData = req.body;
  User.findOne({_id: receivedData.id})
    .then(document => {
      console.log('HALO SZUKAM' + document);
      if(document.userName !== null) {
        const userRatingsArray = document.ratings;
        const receivedMovieId = receivedData.movieId;
        console.log("Oceny istnieją");
        const getRating = userRatingsArray.find(rating => rating.movieId === receivedMovieId);
        console.log(getRating);
        if(getRating !== undefined) {
          res.status(201).json({
            message: "Successfully sent rating!",
            currentUserRating: getRating.rating
          })
        } else {
          res.status(201).json({
            message: "Not rated this movie!"
          })
        }

    } else {
      res.status(201).json({
        message: "No rating!"
      })
    }
  })
});

app.post("/update-rating", (req, res, next) => {
  const receivedData = req.body;
  let previousRating;
  console.log("Chciałbym ZAAKTUALIZOWAĆ: " + receivedData.userId);
  User.findOne({_id: receivedData.userId})
    .then(document => {
      let ratingsArray = document.ratings;
      console.log(ratingsArray);
      ratingsArray.forEach(function(element) {
        if(element.movieId === receivedData.movieId) {
          previousRating = element.rating;
          console.log("The previous rating was " + previousRating);
          element.rating = receivedData.currentRating;
          console.log("And the new rating is " + element.rating);
          element.movieCover = req.body.movieCover;
          document.save();
          console.log(element.rating);
          // cosTam();
        }
      });
      //Wyliczanie nowej średniej
      Movie.findOne({_id: receivedData.movieId})
      .then(document => {
        //Switch deleting previous rating
        switch(previousRating) {
          case 1:
            document.ratings.rating1--;
            break;
          case 2:
            document.ratings.rating2--;
            break;
          case 3:
            document.ratings.rating3--;
            break;
          case 4:
            document.ratings.rating4--;
            break;
          case 5:
            document.ratings.rating5--;
            break;
        }
        //Switch adding current
        switch(receivedData.currentRating) {
          case 1:
            document.ratings.rating1++;
            break;
          case 2:
            document.ratings.rating2++;
            console.log(document.ratings.rating2);
            break;
          case 3:
            document.ratings.rating3++;
            break;
          case 4:
            document.ratings.rating4++;
            break;
          case 5:
            document.ratings.rating5++;
            break;
        }
        console.log("Dodane do filmu");

        const totalNumberOfRatings = document.ratings.rating1 + document.ratings.rating2 + document.ratings.rating3 + document.ratings.rating4 + document.ratings.rating5;

        document.averageRating = (document.ratings.rating1
         + (2 * document.ratings.rating2)
         + (3 * document.ratings.rating3)
         + (4 * document.ratings.rating4)
         + (5 * document.ratings.rating5)) / totalNumberOfRatings;
        document.save();
      });
      res.status(201).json({
        message: "Udało się",
        newRating: receivedData.currentRating
      });
    })
})

app.get("/get-user-list/:userId", (req, res, next) =>{
  console.log("Dawać listę");
  const userId = req.params.userId;
  const movieId = req.params.movieId;
  User.findOne({_id: userId})
    .then(document => {
      console.log(document.ratings);
      console.log("Lista to" + document.ratings);
      res.status(201).json({
        movieList: document.ratings
      });
    })
})

app.get("/get-average/:movieId", (req, res, next) => {
  const movieId = req.params.movieId;
  console.log(req.params.movieId);
  Movie.findOne({_id: movieId})
    .then(document => {
      res.status(201).json({
        message: "Rating sent",
        averageRating: document.averageRating.toFixed(2)
      });
    });
})

app.post("/add-rating", (req, res, next) => {
  const receivedData = req.body;
  console.log(receivedData);
  canProceed = false;
  let movieIds = [];
  //Checking if user already rated this movie
  User.findOne({_id: receivedData.userId})
    .then(document => {
    //Adding rating to user data
    if(document !== null) {
      const userRatingsArray = document.ratings;
      const receivedMovieId = receivedData.movieId;
      userRatingsArray.forEach(function(element) {
        movieIds.push(element.movieId);
      });
    if(!movieIds.includes(receivedMovieId)) {
      console.log("nie zawiera");
      canProceed = true;
    }
      if(canProceed) {
        User.findOne({_id: receivedData.userId})
        .then(document => {
          const newRating = {
            movieId: receivedData.movieId,
            movieTitle: receivedData.movieTitle,
            movieCover: receivedData.movieCover,
            rating: receivedData.currentRating
          };
          document.ratings.push(newRating);
          document.save();
          console.log("Dodane do użytkownika");
        });

          //Adding rating to movie data
    Movie.findOne({_id: receivedData.movieId})
    .then(document => {
      switch(receivedData.currentRating) {
        case 1:
          document.ratings.rating1++;
          break;
        case 2:
          document.ratings.rating2++;
          console.log(document.ratings.rating2);
          break;
        case 3:
          document.ratings.rating3++;
          break;
        case 4:
          document.ratings.rating4++;
          break;
        case 5:
          document.ratings.rating5++;
          break;
      }
      console.log("Dodane do filmu");

      const totalNumberOfRatings = document.ratings.rating1 + document.ratings.rating2 + document.ratings.rating3 + document.ratings.rating4 + document.ratings.rating5;

      document.averageRating = (document.ratings.rating1
       + (2 * document.ratings.rating2)
       + (3 * document.ratings.rating3)
       + (4 * document.ratings.rating4)
       + (5 * document.ratings.rating5)) / totalNumberOfRatings;

      document.save();
      res.status(201).json({
        message: "Successfully sent rating!",
      })
    });
      } else {
        res.status(201).json({
          message: "Already rated this!",
          alreadyRated: true
        })
      }
    } else {
      res.status(201).json({
        message: "Zaloguj się aby ocenić film",
        nobodyLogged: true
      })
    }
    })

});


app.post("/add-movie", (req, res, next) => {
  const receivedMovie = req.body;
  const newMovie = new Movie({
    title: receivedMovie.title,
    genre: receivedMovie.genre,
    description: receivedMovie.description,
    director: receivedMovie.director,
    releaseDate: receivedMovie.releaseDate,
    cover: receivedMovie.cover,
    cast: receivedMovie.cast,
    ratings: {
      rating1: 0,
      rating2: 0,
      rating3: 0,
      rating4: 0,
      rating5: 0,
    },
    averageRating: 0
  })
  newMovie.save();
  res.status(201).json({
    message: "Successfully sent movie data!"
  });
});

app.get('/get-user/:userId', (req, res, next) => {
  const receivedId = req.params.userId;
  // console.log(receivedId);
  User.findOne({_id: receivedId})
    .then (document => {
      res.status(201).json({
        message: "Przesłane dane użytkownika",
        userData: document
      })
    })
})

// app.get('/get-comments/:movieId', (req, res, next) => {
//   const movieId = req.params.movieId;
//   Movie.findOne({_id: movieId})
//     .then(document => {
//       console.log(document.comments);
//       res.status(201).json({
//         message: "Sucessfully fetched comments",
//         comments: document.comments
//       })
//     })
// })

app.get('/get-comments/:movieId', (req, res, next) => {

  const movieId = req.params.movieId;
  Comment.find({movieId: movieId})
    .then(documents => {
      console.log(documents);
      res.status(201).json({
        message: "Pobrano listę",
        comments: documents
      })
    })
})

app.post('/add-comment', (req, res, next) => {
  console.log("Uzyskane dane: " + req.body.content);

  const newComment = new Comment({
    userId: req.body.userId,
    movieId: req.body.movieId,
    userName: req.body.userName,
    content: req.body.content
  })
  newComment.save();

  res.status(201).json({
    message: "Dodano komentarz",
  })
  // Movie.findOne({_id: movieId})
  //   .then(document => {
  //     document.comments.push(newComment);
  //     console.log(document.comments);
  //     document.save();
  //     res.status(201).json({
  //       message: "Przesłano komentarz"
  //     })
  //   })

})

app.post('/get-session', (req, res, next) => {
  // console.log(session);
  // res.status(201).json({
  //   session: session,
  //   message: "Successfully sent article data!"
  // });
  const receivedData = req.body.sessionId;
  Session.findOne({sessionId: receivedData})
    .then(document => {
      console.log('Otrzymane ciasteczko to: ' + receivedData);
      if(document !== null) {
        console.log("Udało się!");
        res.status(201).json({
          message: "Pomyślnie odebrano sesję",
          session: document,
          success: true,
        })
      } else {
        res.status(201).json({
          message: "Sesja nie istnieje",
          success: false,
        })
      }
    });
})

app.post('/logout-session', (req, res, next) => {

  const receivedSessionId = req.body.sessionId;
  Session.deleteOne({ sessionId:  receivedSessionId}, function (err) {
    if (err) return handleError(err);
    // deleted at most one tank document
  });

  res.status(201).json({
    message: "Successfully logged out!"
  });
})

app.post('/logging-in', (req, res, next) => {
  const receivedData = req.body;
  const givenPassword = req.body.password;
  console.log(req.body.username);
  User.findOne({userName: receivedData.username})
    .then(document => {
      if(document === null) {
        res.status(201).json({
          message: "Niepoprawna nazwa użytkownika",
          success: false,
        })
      }else {
        if(givenPassword === document.password) {
          // currentUserId = document._id;
          // currentUserName = document.userName;
          // session.loggedUserId = currentUserId;
          // session.loggedUserName = currentUserName;

          const newSessionKey = document._id + '##' + document.userName;

          const newSession = new Session({
            sessionId: newSessionKey,
            userName: document.userName,
            userId: document._id,
          })

          newSession.save();

          res.status(201).json({
            message: "",
            session: newSession,
            success: true,
            sessionId: newSessionKey
          })


        }else {
          res.status(201).json({
            message: "Błędne hasło!",
            success: false
          })
        }
      }
    });
});

app.post('/add-user-info/:userId', (req, res, next) => {
  const receivedData = req.body;
  const userId = req.params.userId;
  User.findOne({_id: userId})
    .then(document => {
      document.name = receivedData.firstName;
      document.surname = receivedData.lastName;
      document.emailAddress = receivedData.email;
      document.birthDate = receivedData.date;
      document.save();
    })
    res.status(201).json({
      message: "Pomyślnie zaaktualizowano"
    })
});

app.post('/add-user', (req, res, next) => {
  const receivedData = req.body;
  const passwordOnce = req.body.passwordOnce;
  const passwordTwice = req.body.passwordTwice;
  const newUsername = req.body.username;
  const email = req.body.email;
  let usernameTaken;
  serverMessage = '';

  User.deleteMany({ userName: "Rysiekk" }, function (err) {});

  User.findOne({userName: newUsername})
  .then(document => {
    if(document === null) {
      console.log("Nie istnieje");
      usernameTaken = false;
    }else {
      console.log("Znaleziono: " + document.userName);
      usernameTaken = true;
    }
    if(req.body.accepted && passwordOnce === passwordTwice && !usernameTaken) {
      const newUser = new User({
        userName: receivedData.username,
        emailAddress: receivedData.email,
        password: receivedData.passwordOnce,
        permissions: "NN",
        ratings: []
      });
      // console.log(req.body);
      res.status(201).json({
        message: "Konto zostało utworzone!"
      })
      newUser.save();
    }else {
      if(passwordOnce !== passwordTwice) {
        serverMessage = serverMessage + "Hasła nie są takie same!\n\n"
      }
      if(!req.body.accepted) {
        serverMessage = serverMessage + "Proszę zaakceptować regulamin!\n\n"
      }
      if(usernameTaken) {
        serverMessage = serverMessage + "Nazwa użytkownika jest zajęta!"
      }
      res.status(201).json({
        message: serverMessage
      })
    }
  });
});

app.delete('/delete-user/:movieId', (req, res, next) => {
  console.log(req.params.movieId);
  const movieId = req.params.movieId;
  Movie.deleteOne({ _id: movieId}, function (err) {});
  res.status(201).json({
    message: "Deleted!"
  })
});

const movies = [];

app.use('/get-movies-list', (req, res, next) => {
  Movie.find()
    .then(documents => {
      // console.log(documents);
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
      // console.log(documents);
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
      // console.log(document);
      res.status(201).json({
        message: document,
        movie: document
      });
      // res.json({
      //   movie: document
      // });
    });
});

app.use('/get-single-article/:articleId', (req, res, next) => {
  const searchedId = req.params.articleId;
  // const searchedId = "5d0931751c9d44000030a696";
  Article.findById(req.params.articleId)
    .then(document => {
      // console.log(document);
      res.status(201).json({
        message: document,
        article: document
      });
      // res.json({
      //   article: document
      // });
    });

    function cosTam() {
      console.log("dupa");
    }

});

module.exports = app;
