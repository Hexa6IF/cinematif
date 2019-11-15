exports.__esModule = true;

const getDirectorsAndActors = (results) => {
    const directorMap = new Map()
    const actorMap = new Map()
    results.forEach(result => {
        const directorKey = result.iddirect.value;
        const director = {
            id: result.iddirect,
            name: result.directname
        };
        const actorKey = result.idact.value;
        const actor = {
            id: result.idact,
            name: result.actorname
        };
        directorMap.set(directorKey, director);
        actorMap.set(actorKey, actor);
    });
    return ({
        directors: directorMap,
        actors: actorMap
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
        const maps = getDirectorsAndActors(results);
        result = results[0];
        delete result.idact;
        delete result.actorname;
        delete result.iddirect;
        delete result.directname;
        result = Object.assign(result, {
            actors: Array.from(maps.actors.values()),
            directors: Array.from(maps.directors.values())
        });
    }
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
