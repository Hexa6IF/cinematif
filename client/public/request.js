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

async function renderMovieDetails(responseData) {
    let bindings = responseData.results.bindings[0];
    document.getElementById("img-movie").setAttribute('src', await getPosterPathFromName(bindings.movietitle.value));
    document.getElementById("movie-title").innerHTML = bindings.movietitle.value;

    bindings.runtime !== undefined ?
        document.getElementById("movie-runtime").innerText = bindings.runtime.value : document.getElementById("movie-runtime").innerText = "Not found";
    let actorList = document.getElementById("actor-list");
    if (bindings.actors.length > 0) {
        for (let i = 0; i < bindings.actors.length; i++) {
            let actor = document.createElement("li");
            let actorDetail = document.createElement("a");
            //actorDetail.href = clientUrl + movieDetailUrl + '?id=' + arrayBindings[i].idmovie.value;
            actorDetail.appendChild(document.createTextNode(bindings.actors[i].name.value));
            actor.appendChild(actorDetail);
            actorList.appendChild(actor);
        }
    } else {
        actorList.innerText = "Not found";
    }
    let directorList = document.getElementById("director-list");
    if (bindings.directors.length > 0) {
        for (let i = 0; i < bindings.directors.length; i++) {
            let director = document.createElement("li");
            let directorDetail = document.createElement("a");
            //actorDetail.href = clientUrl + movieDetailUrl + '?id=' + arrayBindings[i].idmovie.value;
            directorDetail.appendChild(document.createTextNode(bindings.directors[i].name.value));
            director.appendChild(directorDetail);
            directorList.appendChild(director);
        }
    } else {
        directorList.innerText = "Not found";
    }
    bindings.year !== undefined ?
        document.getElementById("year").innerText = bindings.year.value : document.getElementById("year-container").style.display = "none";
    bindings.gross !== undefined ?
        document.getElementById("gross").innerText = bindings.gross.value : document.getElementById("gross").innerText = "Not found";
    bindings.country !== undefined ?
        document.getElementById("original-country").innerText = bindings.country.value : document.getElementById("original-country").innerText = "Not found";
    bindings.abstract !== undefined ?
        document.getElementById("description").innerText = bindings.abstract.value : document.getElementById("description").innerText = "Not found";
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
