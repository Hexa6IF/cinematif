const baseUrl = window.location.protocol + '//' + window.location.host;
const serverUrl = '/api';
const clientUrl = '';
let queryString = window.location.search;
const actorId = queryString.substring(queryString.indexOf('id=') + 3);
getActorDetails(actorId);

function getActorDetails(actorId)
{
  const actorUrl = '/detail/actor/' + actorId;
  try {
    $.getJSON(serverUrl + actorUrl, function (responseData) {
      renderActorDetails(responseData);
    });
  } catch (e) {
    throw Error(e);
  }
}

function renderActorDetails(responseData)
{
  let bindings = responseData.results.bindings[0];
  document.getElementById('img-actor').setAttribute('src', bindings.thumb.value);
  document.getElementById("actor-name").innerHTML = bindings.actorname.value;
  bindings.abstract !== undefined ?
    document.getElementById("description").innerHTML = bindings.abstract.value : null;

  let movieList = document.getElementById("movie-list");
  const movieUrl = '/movie.html';
  if (bindings.films.length > 0) {
    for (let i = 0; i < bindings.films.length; i++) {
      let film = document.createElement("li");
      let filmDetail = document.createElement("a");
      filmDetail.href = clientUrl + movieUrl + '?id=' + bindings.films[i].id.value;
      filmDetail.appendChild(document.createTextNode(bindings.films[i].name.value));
      film.appendChild(filmDetail);
      movieList.appendChild(film);
    }
  } else {
    movieList.innerText = "Not found";
  }
}