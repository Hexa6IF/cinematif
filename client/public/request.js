let serverUrl = 'http://localhost:5000/api/search';

function getMovies(movieSearch)
{
    //movieSearch to lowercase
    let queryParams = {
        title : movieSearch
    }
    if (typeof movieSearch === 'string'){
        $.getJSON(serverUrl, queryParams, function( responseData ) {
            console.log(responseData);
            console.log(responseData.results.bindings);
            let arrayBindings = responseData.results.bindings;
            let list = document.getElementById("movie-search-results");
            list.innerHTML = "";
            for (let i = 0; i < arrayBindings.length; i++){
                let movie = document.createElement("li");
                movie.appendChild(document.createTextNode(arrayBindings[i].title.value));
                list.appendChild(movie);
            }
            return responseData;
        });
    }
    else {
        console.error(movieSearch);
        throw Error('getMovies : argument is not a string');
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
