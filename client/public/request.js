const serverUrl = 'http://localhost:5000/api';
const clientUrl = 'http://localhost:5000';

function getMovies(movieSearch) {
    movieSearch = movieSearch.toLowerCase();
    const queryParams = {
        title: movieSearch
    }

    let searchUrl = serverUrl + '/search';
    if (typeof movieSearch === 'string') {
        $.getJSON(searchUrl, queryParams, function (responseData) {
            renderSearchResult(responseData);
        });
    } else {
        console.error(movieSearch);
        throw Error('getMovies : argument is not a string');
    }
}

function renderSearchResult(responseData) {
    let arrayBindings = responseData.results.bindings;
    let list = document.getElementById("movie-search-results");
    list.innerHTML = "";
    const movieDetailUrl = '/movie.html';
    for (let i = 0; i < arrayBindings.length; i++) {
        let movie = document.createElement("li");
        let movieDetail = document.createElement("a");
        movieDetail.href = clientUrl + movieDetailUrl + '?id=' + arrayBindings[i].idmovie.value;
        movieDetail.appendChild(document.createTextNode(arrayBindings[i].movietitle.value));
        movie.appendChild(movieDetail);
        list.appendChild(movie);
    }
}

function getMovieDetails(movieId) {
    const movieUrl = '/detail/film/' + movieId;
    try {
        $.getJSON(serverUrl + movieUrl, function (responseData) {
            renderMovieDetails(responseData);
        });
    } catch (e) {
        throw Error(e);
    }
}

function renderMovieDetails(responseData) {
    let arrayBindings = responseData.results.bindings;
    console.log(arrayBindings);
}

function getActor(actorId)
{
    const actorUrl = '/detail/actor/' + actorId;
    try {
        $.getJSON(serverUrl + actorUrl, function (responseData) {
            renderActorDetails();
        });
    } catch (e) {
        throw Error(e);
    }
}

function renderActorDetails() {}
