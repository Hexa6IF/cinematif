const express = require('express')
const app = express();
const path = require('path');
const port = 5000;
const dps = require('dbpedia-sparql-client').default;;
const { createLogger, format, transports } = require('winston');

const queryBuilder = require('./services/queryBuilder');
const groupFilms = require('./services/parsers').groupFilms;
const groupDirectorsActors = require('./services/parsers').groupDirectorsActors;

require('dotenv').config();

/* Logger */
const logger = createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss'
    }),
    format.errors({ stack: true }),
    format.splat(),
    format.json()
  ),
  defaultMeta: { service: 'user-service' },
  transports: [
    //
    // - Write to all logs with level `info` and below to `combined.log`.
    // - Write all logs error (and below) to `error.log`.
    //
    new transports.Console({
      format: format.combine(
        format.colorize(),
        format.simple()
      )
    })
  ]
});

/* Static File Declaration */

app.use(express.static(path.join(__dirname, '../client/public')));

/* Routes */

app.get('/api/search', async (req, res) => {
  // Filters
  //
  const query = queryBuilder.searchQuery(req.query);
  const results = await getResults(query);
  res.send(results);
})

app.get('/api/detail/:type/:id', async (req, res, next) => {
  let query = '';
  let grouper = null;
  switch (req.params.type) {
    case 'director':
      query = queryBuilder.directorQuery(req.params.id);
      grouper = groupFilms;
      break;
    case 'actor':
      query = queryBuilder.actorQuery(req.params.id);
      grouper = groupFilms;
      break;
    case 'film':
      query = queryBuilder.filmQuery(req.params.id);
      grouper = groupDirectorsActors;
      break;
    default:
      res.status(404);
      res.json({ error: 'Request not found' });
      return null;
  }
  results = await getResults(query, grouper);
  res.send(results);
})

/* Services */
const getResults = async (query, grouper) => {
  const response = await dps.client().query(query).timeout(5000).asJson();
  if(grouper){
    response.results.bindings = grouper(response.results.bindings);
  }
  return response;
}
/* Server */

app.listen(port, (req, res) => {
  logger.info(`Server listening on port: ${port}`);
  console.log(`Server listening on port: ${port}`);
})
