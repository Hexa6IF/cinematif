
const express = require('express')
const app = express();
const fs = require('file-system');
const path = require('path');
const port = process.env.PORT || 5000;
const dps = require('dbpedia-sparql-client').default;;
const { createLogger, format, transports } = require('winston');


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
    new transports.File({ filename: 'error.log', level: 'error' }),
    new transports.File({ filename: 'combined.log' })
  ]
});

/* Static File Declaration */

app.use(express.static(path.join(__dirname, '../client/build')));

/* Routes */

app.get('/api/search/:text', async (req, res) => {
  console.log(req.params.text);
  const query = makeQuerySearch(req.params.text);
  const results = await getResults(query);
  res.send(results);
})

app.get('/api/details/:type/:text', async (req, res) => {
  console.log(req.params.text);
  console.log(req.params.type);
  const query = '';
  switch (req.params.type) {
    case 'director':
      query = makeQueryDirector(req.params.text);
      break;
    case 'actor':
      query = makeQueryActor(req.params.text);
      break;
    case 'film':
      query = makeQueryFilm(req.params.text);
      break;
    default:
      throw('Request not found')
  }
  const results = await getResults(query);
  res.send(results);
})

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
  //
  app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
  })
} else {
  app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/public/index.html'));
  })
  logger.add(new transports.Console({
    format: format.combine(
      format.colorize(),
      format.simple()
    )
  }));
}



/* Services */
const Headers = (
  'PREFIX dbo: <http://dbpedia.org/ontology/> ' +
  'PREFIX yago: <http://yago-knowledge.org/resource/> ' +
  'PREFIX owl: <http://www.w3.org/2002/07/owl#> ' +
  'PREFIX xsd: <http://www.w3.org/2001/XMLSchema#> ' +
  'PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#> ' +
  'PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> ' +
  'PREFIX foaf: <http://xmlns.com/foaf/0.1/> ' +
  'PREFIX dc: <http://purl.org/dc/elements/1.1/> ' +
  'PREFIX : <http://dbpedia.org/resource/> ' +
  'PREFIX dbpedia2: <http://dbpedia.org/property/> ' +
  'PREFIX dbpedia: <http://dbpedia.org/> ' +
  'PREFIX skos: <http://www.w3.org/2004/02/skos/core#> ')

const makeQuerySearch = (para) => {
  const query = (
    Headers +
    `SELECT ?n ?id WHERE { ?m rdf:type dbo:Film; rdfs:label ?n; dbo:wikiPageID ?id. FILTER(?n like '%${para}%')} LIMIT 10`);
  return query;
}

const makeQueryActor = (para) => {
  const query = (
    Headers +
    `SELECT ?n ?id WHERE { ?m rdf:type dbo:Film; rdfs:label ?n; dbo:wikiPageID ?id. FILTER(?n like '%${para}%')} LIMIT 10`);
  return query;
}

const makeQueryDirector = (para) => {
  const query = (
    Headers +
    `SELECT ?n ?id WHERE { ?m rdf:type dbo:Film; rdfs:label ?n; dbo:wikiPageID ?id. FILTER(?n like '%${para}%')} LIMIT 10`);
  return query;
}

const makeQueryFilm = (para) => {
  const query = (
    Headers +
    `SELECT ?n ?id WHERE { ?m rdf:type dbo:Film; rdfs:label ?n; dbo:wikiPageID ?id. FILTER(?n like '%${para}%')} LIMIT 10`);
  return query;
}

const getResults = async (query) => {
  const response = await dps.client().query(query).timeout(15000).asJson()
  return response;
}
/* Server */

app.listen(port, (req, res) => {
  logger.info(`Server listening on port: ${port}`);
  console.log(`Server listening on port: ${port}`);
})
