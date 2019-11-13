exports.__esModule = true;

const getDirectorsActors = (results) => {
    const directorMap = new Map()
    const actorMap = new Map()
    results.forEach(result => {
        const directorKey = result.iddirect.value
        const director = { id: result.iddirect, name: result.directname }
        const actorKey = result.idact.value
        const actor = { id: result.idact, name: result.actorname }
        directorMap.set(directorKey, director)
        actorMap.set(actorKey, actor)
    });
    return { directorMap, actorMap }
}

exports.cleanFilm = (results) => {
    const maps = getDirectorsActors(results)
    results = [results[0]]
    results[0].idact = undefined
    results[0].iddirect = undefined
    results[0].directname = undefined
    results[0].actorname = undefined
    results[0].actors = Array.from(maps.actorMap.values())
    results[0].directors = Array.from(maps.directorMap.values())
    return results
}

const getFilms = (results) => {
    const filmsMap = new Map()
    results.forEach(result => {
        const directorKey = result.iddirect.value
        const director = { id: result.iddirect, name: result.directname }
        const actorKey = result.idact.value
        const actor = { id: result.idact, name: result.actorname }
        directorMap.set(directorKey, director)
        actorMap.set(actorKey, actor)
    });
    return { directorMap, actorMap }
}

exports.cleanFilm = (results) => {
    const maps = getDirectorsActors(results)
    results = [results[0]]
    results[0].idact = undefined
    results[0].iddirect = undefined
    results[0].directname = undefined
    results[0].actorname = undefined
    results[0].actors = Array.from(maps.actorMap.values())
    results[0].directors = Array.from(maps.directorMap.values())
    return results
}

const getDirectorsActors = (results) => {
    const directorMap = new Map()
    const actorMap = new Map()
    results.forEach(result => {
        const directorKey = result.iddirect.value
        const director = { id: result.iddirect, name: result.directname }
        const actorKey = result.idact.value
        const actor = { id: result.idact, name: result.actorname }
        directorMap.set(directorKey, director)
        actorMap.set(actorKey, actor)
    });
    return { directorMap, actorMap }
}

exports.cleanFilm = (results) => {
    const maps = getDirectorsActors(results)
    results = [results[0]]
    results[0].idact = undefined
    results[0].iddirect = undefined
    results[0].directname = undefined
    results[0].actorname = undefined
    results[0].actors = Array.from(maps.actorMap.values())
    results[0].directors = Array.from(maps.directorMap.values())
    return results
}

