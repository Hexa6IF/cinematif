const baseUrl = window.location.protocol + '//' + window.location.host;
const serverUrl = '/api';
const clientUrl = '';
let queryString = window.location.search;
const movieId = queryString.substring(queryString.indexOf('id=') + 3);
getMovieDetails(movieId);

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
    document.getElementById("movie-runtime").innerText = (bindings.runtime.value/3600).toFixed(1) + ' hours': document.getElementById("movie-runtime").innerText = "Not found";

  let actorList = document.getElementById("actor-list");
  const actorUrl = '/actor.html';
  if (bindings.actors.length > 0) {
    for (let i = 0; i < bindings.actors.length; i++) {
      let actor = document.createElement("li");
      let actorDetail = document.createElement("a");
      actorDetail.href = clientUrl + actorUrl + '?id=' + bindings.actors[i].id.value;
      actorDetail.appendChild(document.createTextNode(bindings.actors[i].name.value));
      actor.appendChild(actorDetail);
      actorList.appendChild(actor);
    }
  } else {
    actorList.innerText = "Not found";
  }

  let directorList = document.getElementById("director-list");
  const directorUrl = '/director.html';
  if (bindings.directors.length > 0) {
    for (let i = 0; i < bindings.directors.length; i++) {
      let director = document.createElement("li");
      let directorDetail = document.createElement("a");
      directorDetail.href = clientUrl + directorUrl + '?id=' + bindings.directors[i].id.value;
      directorDetail.appendChild(document.createTextNode(bindings.directors[i].name.value));
      director.appendChild(directorDetail);
      directorList.appendChild(director);
    }
  } else {
    directorList.innerText = "Not found";
  }

  bindings.year !== undefined ?
    // document.getElementById("year").innerText = bindings.year.value : document.getElementById("year-container").style.display = "none";
    document.getElementById("year").innerText = bindings.year.value : null;
  bindings.gross !== undefined ?
    document.getElementById("gross").innerText = '$' + Number(bindings.gross.value) : null;
  bindings.country !== undefined ?
    document.getElementById("original-country").innerText = bindings.country.value : null;
  bindings.abstract !== undefined ?
    document.getElementById("description").innerText = bindings.abstract.value : null;
}