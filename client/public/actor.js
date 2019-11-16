function getActor(actorId)
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

function renderActorDetails() {}