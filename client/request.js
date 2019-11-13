let $ = require('jquery');

let serverUrl = 'localhost_something';

function getMovies(movieSearch)
{
    let searchUrl = serverUrl+'/movies?search=';
    if (typeof movieSearch === 'string'){
        $.getJSON(searchUrl+movieSearch, function( responseData ) {
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
