const express = require("express");
const app = express();

app.use(express.json());

let movies = [
  {
    id: 1,
    title: "Inception",
    director: "Christopher Nolan",
    year: 2010,
    genre: "Sci-fi"
  },
  {
    id: 2,
    title: "The Matrix",
    director: "The Wachowskis",
    year: 1999,
    genre: "Sci-fi"
  },
  {
    id: 3,
    title: "Parasite",
    director: "Bong Joon-ho",
    year: 2019,
    genre: "Drama"
  }
];

app.get("/movies", (req, res) => {
  res.status(200).json(movies);
});

app.get("/movies/:id", (req, res) => {
  const id = Number(req.params.id);
  const movie = movies.find(movie => movie.id === id);

  if (!movie) {
    return res.status(404).json({ error: "Movie not found" });
  }

  res.status(200).json(movie);
});

app.post("/movies", (req, res) => {

const { title, director, year, genre } = req.body;
const newMovie = {
  id: movies.length ? Math.max(...movies.map(m => m.id)) + 1 : 1,
  title,
  director,
  year,
  genre: genre || "Unspecified"
};

  if (!title || !director || !year) {
    return res.status(400).json({ error: "title, director and year are required" });
  }

  movies.push(newMovie);

  res.status(201).json(newMovie);
});

app.put("/movies/:id", (req, res) => {
  const id = Number(req.params.id);
  const movieIndex = movies.findIndex(movie => movie.id === id);

  if (movieIndex === -1) {
    return res.status(404).json({ error: "Movie not found" });
  }

  const { title, director, year, genre } = req.body || {};

  if (!title || !year || !genre || typeof year !== "number") {
    return res.status(400).json({ error: "title, year, and genre are required, and year must be a number" });
  }

  const updatedMovie = {
    id,
    title,
    director: director || null,
    year,
    genre
  };

  movies[movieIndex] = updatedMovie;

  return res.status(200).json(updatedMovie);
});

app.patch("/movies/:id", (req, res) => {
  const id = Number(req.params.id);
  const movie = movies.find(movie => movie.id === id);

  if (!movie) {
    return res.status(404).json({ error: "Movie not found" });
  }

  const { title, director, year } = req.body || {};

  if (title !== undefined && (typeof title !== "string" || title.trim() ==="")) {
    return res.status(400).json({error: "title must be a non-empty string"});
  }

  if (director !== undefined && (typeof title !== "string" || title.trim() === "")) {
    return res.status(400).json({error: "director must be a non-empty string"});
  }

  if (genre !== undefined && (typeof title !== "string" || title.trim() ==="")) {
    return res.status(400).json({error: "genre must be a non-empty string"});
  }

  if (title !== undefined) movie.title = title;
  if (director !== undefined) movie.director = director;
  if (year !== undefined) movie.year = year;
  if (genre !== undefined) movie.genre = genre;

  return res.status(200).json(movie);
});

app.delete('/movies/:id', (req, res) => {
  const id = Number(req.params.id);
  const index = movies.findIndex(movie => movie.id === id);

  if (index === -1) {
    return res.status(404).json({ error: 'Movie not found' });
  }
  
  movies.splice(index, 1);
  res.status(204).send();
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});