const route = require("express").Router();
const fetch = require("node-fetch");

const searchURL = "https://api.themoviedb.org/3/search/movie/";
// // use page=pagenumber for pagination
// `https://api.themoviedb.org/3/movie/${id}/reviews?api_key=${API_KEY}&language=en-US&page=1`
// `https://api.themoviedb.org/3/movie/${id}?api_key${API_KEY}&language=en-US`;

route.post("/", async (req, res) => {
  console.log(req.body);

  const movieName = req.body.movie;
  const url = `${searchURL}?api_key=${process.env.API_KEY}&query=${movieName}`;
  const response = await fetch(url);
  const movie_list = await response.json();

  const movies = [];
  movie_list.results.forEach(movie => {
    const data = {
      posterURL: `https://image.tmdb.org/t/p/w500/${movie.poster_path}`,
      backdropURL: `https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`,
      language: movie.original_language,
      title: movie.original_title,
      rating: movie.vote_average,
      overview: movie.overview,
      release_date: movie.release_date,
      id: movie.id,
      genre_ids: movie.genre_ids
    };
    movies.push(data);
  });

  res.json(movies);
});

module.exports = route;
