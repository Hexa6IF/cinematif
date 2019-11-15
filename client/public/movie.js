const baseUrl = window.location.protocol + '//' + window.location.host;
let queryString = window.location.search;
const movieId = queryString.substring(queryString.indexOf('id=') + 3);
getMovieDetails(movieId);