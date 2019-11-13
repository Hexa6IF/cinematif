let serverUrl = 'http://localhost:5000/api';

function getMovies(movieSearch)
{
    movieSearch = movieSearch.toLowerCase();
    let queryParams = {
        title : movieSearch
    }

    let searchUrl = '/search';
    if (typeof movieSearch === 'string'){
        $.getJSON(serverUrl+searchUrl, queryParams, function( responseData ) {
            renderSearchResult(responseData);
        });
    }
    else {
        console.error(movieSearch);
        throw Error('getMovies : argument is not a string');
    }
}

function renderSearchResult (responseData) {
    let arrayBindings = responseData.results.bindings;
    let list = document.getElementById("movie-search-results");
    list.innerHTML = "";
    let movieDetailUrl = '/detail/film/';
    for (let i = 0; i < arrayBindings.length; i++){
        let movie = document.createElement("li");
        let movieDetail = document.createElement("a");
        movieDetail.href = serverUrl + movieDetailUrl + arrayBindings.id.value;
        movieDetail.appendChild(document.createTextNode(arrayBindings[i].title.value));
        movie.appendChild(movieDetail);
        //movie.appendChild(document.createTextNode(arrayBindings[i].title.value));
        list.appendChild(movie);
    }
}

function getMovie(movieIdentifier)
//identifier could be a name or something else, to be decided
{
    let movieUrl = serverUrl+'/movie/'+movieIdentifier;
    $.getJSON(movieUrl+movieIdentifier, function( responseData ) {
        //TODO : serialize data
        return responseData;
    });
}

function getActor(actorIdentifier)
//identifier could be a name or something else, to be decided
{
    let movieUrl = serverUrl+'/actor/'+actorIdentifier;
    $.getJSON(movieUrl+actorIdentifier, function( responseData ) {
        //TODO : serialize data
        return responseData;
    });
}
