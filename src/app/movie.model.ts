export class Movie {
  id: number;
  title: string;
  genre: string;
  description: string;
  director: string;
  releaseDate: string;
  cover: string;
  cast: string[];
}

   // const searchedPath = 'http://localhost:3000/get-movies-list/' + id;
    // this.http
    //   .get<{movie: any}>(
    //     searchedPath
    //   )
    //   .pipe(map((movieData) => {
    //     return movieData.movie.map(movie => {
    //       return {
    //         id: movie._id,
    //         title: movie.title,
    //         genre: movie.genre,
    //         description: movie.description,
    //         director: movie.director,
    //         releaseDate: movie.releaseDate,
    //         cover: movie.cover,
    //         cast: movie.cast,
    //       };
    //     });
    //   }))
    //   .subscribe((transformedMovie) => {
    //     // this.movies = receivedData.movies;
    //     this.singleMovie = transformedMovie;
    //     console.log("Movie sucessfully loaded!");
    //     // console.log(this.movies);
    //     this.movieSelected.next(this.singleMovie);
    //   });


// app.use('/get-single-movie/:movieId', (req, res, next) => {
//   const searchedId = req.params.movieId;
//   // const searchedId = "5d0931751c9d44000030a696";
//   Movie.findById(req.params.movieId)
//     .then(document => {
//       console.log(document);
//       res.status(201).json({
//         message: document
//       });
//       res.json({
//         movie: document
//       });
//     });
// });

// app.get('/', (req, res, next) => {
//   // const searchedId = req.params.movieId;
//   res.status(201).json({
//     message: "Working!"
//   });
// });
