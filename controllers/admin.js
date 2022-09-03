const Movie = require("../models/Movie");

exports.GetAddMovie = (req, res, next) => {
  res.render("admin/sv-upt-movie", {
    pageTitle: "Add movie",
    AddMovieActive: true,
    editMode: false,
  });
};

exports.GetAdminMovie = (req, res, next) => {
  Movie.GetAll(function (movies) {
    res.render("admin/movie-list", {
      pageTitle: "Admin movies",
      AdminMoviesActive: true,
      movs: movies,
      hasMovies: movies.length > 0,
    });
  });
};

exports.PostAddMovie = (req, res, next) => {
  const name = req.body.Name;
  const status = req.body.Status;
  const gender = req.body.Gender;
  const description = req.body.Description;

  const movie = new Movie(null, name, status, gender, description);
  movie.Save();

  res.redirect("/admin/movies");

};

exports.GetEditMovie = (req, res, next) => {
  const movieId = req.params.movieId;
  const edit = req.query.edit;

  if (!edit) {
    return res.redirect("/");
  }

  Movie.GetById(movieId, (movie) => {
    res.render("admin/sv-upt-movie", {
      pageTitle: "edit movies",
      editMode: edit,
      movie: movie,
    });
  });
};

exports.PostEditMovie = (req, res, next) => {
  const id = req.body.MovieId;
  const name = req.body.Name;
  const status = req.body.Status;
  const gender = req.body.Gender;
  const description = req.body.Description;

  const movie = new Movie(id, name, status, gender, description);
  movie.Save();

  res.redirect("/admin/movies");

};

exports.DeleteMovie = (req, res, next) => {
  const id = req.body.MovieId;

  Movie.Delete(id);

  res.redirect("/admin/movies");
};