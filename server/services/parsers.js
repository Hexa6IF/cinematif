exports.__esModule = true;

const getDirectorsActorsAndRelatedMovies= (results) => {
    const directorMap = new Map()
    const actorMap = new Map()
    const relFilmMap = new Map()
    results.forEach(result => {
        if (result.iddirect) {
            const directorKey = result.iddirect.value;
            const director = {
                id: result.iddirect,
                name: result.directname
            };
            directorMap.set(directorKey, director);
        };

        if (result.idact) {
            const actorKey = result.idact.value;
            const actor = {
                id: result.idact,
                name: result.actorname
            };
            actorMap.set(actorKey, actor);
        };

        if (result.relatedidmovie) {
            const relFilmKey = result.relatedidmovie.value;
            const relFilm = {
                id: result.relatedidmovie,
                name: result.relatedmovietitle
            };
            relFilmMap.set(relFilmKey, relFilm);
        }
    });
    return ({
        directors: directorMap,
        actors: actorMap,
        relatedfilms: relFilmMap
    });
}

const getFilms = (results) => {
    const filmsMap = new Map();
    results.forEach(result => {
        const filmKey = result.idmovie.value;
        const film = {
            id: result.idmovie,
            name: result.movietitle
        };
        filmsMap.set(filmKey, film);
    });
    return filmsMap;
}

exports.groupDirectorsActors = (results) => {
    let result = [];
    if (results && results.length) {
        const maps = getDirectorsActorsAndRelatedMovies(results);
        result = results[0];
        delete result.idact;
        delete result.actorname;
        delete result.iddirect;
        delete result.directname;
        delete result.relatedidmovie;
        delete result.relatedmovietitle;
        result = Object.assign(result, {
            actors: Array.from(maps.actors.values()),
            directors: Array.from(maps.directors.values()),
            relatedmovies: Array.from(maps.relatedfilms.values())
        });
    }
    console.log(result);
    return [result];
}

exports.groupFilms = (results) => {
    let result = [];
    if (results && results.length) {
        const filmsMap = getFilms(results);
        result = results[0];
        delete result.idmovie;
        delete result.movietitle;
        result = Object.assign(result, { films: Array.from(filmsMap.values()) });
    }
    return [result];
}
