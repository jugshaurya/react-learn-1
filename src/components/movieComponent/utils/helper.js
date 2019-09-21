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

// may be not a good hack but let it be for now!!!!
let globalField;

export const sortMovies = (movies, field) => {
  globalField = field;
  if (field === "title") {
    movies.sort(stringSortingHelper);
  } else if (field === "genre") {
    movies.sort(objectSortingHelper);
  } else {
    movies.sort(intSortingHelper);
  }

  return movies;
};

function stringSortingHelper(a, b) {
  let nameA = a[globalField].toLowerCase();
  let nameB = b[globalField].toLowerCase();
  if (nameA < nameB)
    //sort string ascending
    return -1;
  else return 1;
}

function objectSortingHelper(a, b) {
  let nameA = a[globalField].name.toLowerCase();
  let nameB = b[globalField].name.toLowerCase();
  console.log(nameA, nameB);
  if (nameA < nameB) return -1;
  else return 1;
}

function intSortingHelper(a, b) {
  return a[globalField] - b[globalField];
}
