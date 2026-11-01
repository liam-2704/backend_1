const express = require("express");
const app = express();

app.use(express.json());

let movies = [
  {
    id: 1,
    title: "Inception",
    director: "Christopher Nolan",
    year: 2010
  },
  {
    id: 2,
    title: "The Matrix",
    director: "The Wachowskis",
    year: 1999
  },
  {
    id: 3,
    title: "Parasite",
    director: "Bong Joon-ho",
    year: 2019
  }
];

app.get("/movies", (req, res) => {
  res.status(200).json(movies);
});


app.get("/movies/:id", (req, res) => {
  const id = Number(req.params.id);
  const movie = movies.find(movie => movie.id === id);

  if(!movie) {
    return res.status(404).json ({error: "Movie not found" });
  }

  res.status(200).json(movie);
}
);

app.post("/movies", (req, res) => {
  const {title, director, year} = req.body;

  if (!title || !director || !year) {
    return res.status(400).json ({error: "title, director and year are required"});
  }

  const newMovie = {
    id: movies.length ? Math.max(...movies.map(m => m.id)) + 1 : 1,
    title,
    director,
    year
  };

  movies.push(newMovie);

  res.status(201).json(newMovie);
});



app.patch("/movies/:id", (req, res) => {
  const id = Number(req.params.id);
  const movie = movies.find(movie => movie.id === id);

  if (!movie) {
    return res.status(404).json({ error: "Movie not found" });
  }

  const { title, director, year } = req.body || {};

  if (title !== undefined) movie.title = title;
  if (director !== undefined) movie.director = director;
  if (year !== undefined) movie.year = year;

  return res.status(200).json(movie);
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

