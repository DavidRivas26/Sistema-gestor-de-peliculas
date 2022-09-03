const fs = require("fs");
const path = require("path");

const dataPath = path.join(
  path.dirname(require.main.filename),
  "data",
  "movies.json"
);

const GetAllMoviesFromFile = function (callBack) {
  fs.readFile(dataPath, function (error, data) {
    if (error) {
      callBack([]);
    } else {
      callBack(JSON.parse(data));
    }
  });
};

module.exports = class Movie {
  constructor(id, name, status, gender, description) {
    this.id = id;
    this.name = name;
    this.status = status;
    this.gender = gender;
    this.description = description;
  }

  Save() {
    
    GetAllMoviesFromFile((movies) => {
      
        if (this.id) {
        const editMovieIndex = movies.findIndex(
          (mov) => mov.id === this.id
        );

        movies[editMovieIndex] = this;
        fs.writeFile(dataPath, JSON.stringify(movies), function (error) {
          console.log(error);
        });
      } 
      
      else {
        this.id = Math.random().toString();
        movies.push(this);
        fs.writeFile(dataPath, JSON.stringify(movies), function (error) {
          console.log(error);
        });
      }
    });
  }

  static GetAll(cb) {
    GetAllMoviesFromFile(cb);
  }

  static GetById(id, cb) {
    GetAllMoviesFromFile((movies) => {
      const movie = movies.find((m) => m.id === id);
      cb(movie);
    });
  }

  static Delete(id) {
    GetAllMoviesFromFile((movies) => {

      const newMovieList = movies.filter((mov) => mov.id !== id);

      fs.writeFile(dataPath, JSON.stringify(newMovieList), function (error) {
        console.log(error);
      });
    });
  }
};