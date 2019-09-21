export const paginate = (movies, currentPage, pageSize) => {
  const pageMovieStartingPoint = (currentPage - 1) * pageSize;
  const pageMovieEndingPoint = pageMovieStartingPoint + pageSize;

  const moviesForPage = [];
  for (
    let i = pageMovieStartingPoint;
    i < pageMovieEndingPoint && i < movies.length;
    i++
  ) {
    moviesForPage.push({
      ...movies[i]
    });
  }

  return moviesForPage;
};

export const filterMovies = (movies, currentGenre) => {
  return currentGenre === "all"
    ? movies
    : movies.filter(movie => movie.genre.name === currentGenre);
};
