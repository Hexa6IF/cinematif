const apikey = 'bc6fbc388b90c6a7b4fa85194584a2cb';

const stripMovieName = (rawName) => {
    const parenthesisIndex = rawName.indexOf('(')
    let name = rawName
    if (parenthesisIndex!==-1) {
        name= rawName.substr(0, parenthesisIndex)
    }
    return name;
}

const getPosterPathFromName = async (name) => {
    const strippedName = stripMovieName(name)
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${apikey}&language=en-US&query=${strippedName}&page=1&include_adult=false`
    let posterPath = null;
    try {
        const encodedUrl = encodeURI(url)
        const json = await fetch(encodedUrl).json()
        if (json.results && json.results.length) {
            posterPath = json.results[0].poster_path
            if (!posterPath) {
                throw Error('No poster for this film')
            }
        } else {
            throw Error('No result for given query')
        }
    } catch (e) {
        console.log('Error getting film poster',e)
    }
    posterPath = 'https://image.tmdb.org/t/p/original/' + posterPath;
    return posterPath
}
