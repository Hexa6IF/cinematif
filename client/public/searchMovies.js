const serverUrl = '/api';
const clientUrl = '';

function getMovies(movieSearch, size, page) {
    movieSearch = movieSearch.toLowerCase();
    const queryParams = {
        title: movieSearch,
        size,
        page
    }

    let searchUrl = serverUrl + '/search';
    if (typeof movieSearch === 'string') {
        $.getJSON(searchUrl, queryParams, function (responseData) {
            renderSearchResult(responseData);

            const searchBar = document.getElementById("main-search-bar");

            document.getElementById("main-search").style.display = "none";
            const navBar = document.getElementById("side-search")
            navBar.classList.add("horizontal-grid");
            navBar.appendChild(searchBar);
        });
    } else {
        console.error(movieSearch);
        throw Error('getMovies : argument is not a string');
    }
}

async function renderSearchResult(responseData) {
    let arrayBindings = responseData.results.bindings;
    let list = document.getElementById("movie-search-results");
    list.classList.add("search-results");
    list.innerHTML = "";

    const movieDetailUrl = '/movie.html';

    for (const binding of arrayBindings) {
        let movie = document.createElement("li");
        let movieDetail = document.createElement("a");
        let movieTitle = document.createElement("p");

        try{
            let moviePoster = document.createElement("img");
            moviePoster.src = await getPosterPathFromName(binding.movietitle.value);
            movieDetail.appendChild(moviePoster);
        } catch(e) { }

        movieTitle.appendChild(document.createTextNode(binding.movietitle.value));
        movieDetail.appendChild(movieTitle);
        movieDetail.className = "is-wrapped";
        movieDetail.href = clientUrl + movieDetailUrl + '?id=' + binding.idmovie.value;
        movie.appendChild(movieDetail);
        list.appendChild(movie);
    };
}
