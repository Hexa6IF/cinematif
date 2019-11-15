const prefixes = (
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
  'PREFIX skos: <http://www.w3.org/2004/02/skos/core#> ');

const addFilters = (filters) => {
    return '';
}

const searchQuery = (para, filters) => {
  return (
    prefixes +
    `SELECT ?title ?id WHERE ` +
    `{ ?m dbpedia2:recorded ?year ; ` +
    `dbo:wikiPageID ?id ; ` +
    `rdf:type dbo:Film ; ` +
    `dbpedia2:country ?country ; ` +
    `dbo:director ?direct ; ` +
    `dbo:runtime ?runtime ; ` +
    `dbo:gross ?gross ; ` +
    `rdfs:label ?title . ` +
    addFilters(filters) +
    `FILTER (lcase(str(?title)) like '%${para}%') ` +
    `FILTER langMatches(lang(?title),"en") ` +
    `} LIMIT 50`);
}

const actorQuery = (para) => {
  return (
    prefixes +
    `SELECT ?idactor ?name ?movietitle ?idmovie ?thumb WHERE {` +
    `?actor ^dbo:starring ?movie; dbo:wikiPageID ?idactor; foaf:name ?name; dbo:thumbnail ?thumb. ` +

    `?movie  rdfs:label ?movietitle; ` +
    `dbo:wikiPageID ?idmovie ; ` +
    `dbpedia2:recorded ?year ; ` +
    `rdf:type dbo:Film ; ` +
    `dbpedia2:country ?country ; ` +
    `dbo:director ?direct ; ` +
    `dbo:runtime ?runtime ; ` +
    `dbo:gross ?gross . ` +

    `FILTER langMatches(lang(?name),"en") ` +
    `FILTER langMatches(lang(?movietitle),"en") ` +
    `FILTER (?idactor = ${para}) ` +
    `} ` +
    `LIMIT 100`);
}

const directorQuery = (para) => {
  return (
    prefixes +
    `SELECT ?iddirect ?name ?movietitle ?idmovie ?thumb WHERE { ` +
    `?direct foaf:name ?directname; dbo:wikiPageID ?iddirect; foaf:name ?name; dbo:thumbnail ?thumb. ` +

    `?movie dbo:director ?direct; ` +
    `rdfs:label ?movietitle ; ` +
    `dbo:wikiPageID ?idmovie ; ` +
    `dbpedia2:recorded ?year ; ` +
    `rdf:type dbo:Film ; ` +
    `dbpedia2:country ?country ; ` +
    `dbo:runtime ?runtime ; ` +
    `dbo:gross ?gross . ` +

    `FILTER langMatches(lang(?movietitle),"en") ` +
    `FILTER langMatches(lang(?directname),"en") ` +
    `FILTER(?iddirect = ${para}) ` +
    `} ` +
    `LIMIT 100`);
}

const filmQuery = (para) => {
  return (
    prefixes +
    `SELECT ?id ?title ?year ?directname ?iddirect ?runtime ?gross ?idact ?actorname ?country WHERE {` +
    `?actor ^dbo:starring ?movie; dbo:wikiPageID ?idact; rdfs:label ?actorname . ` +
    `?direct dbo:wikiPageID ?iddirect; foaf:name ?directname . ` +
    `?movie dbpedia2:recorded ?year ; dbo:wikiPageID ?id ; rdf:type dbo:Film ; dbpedia2:country ?country ; dbo:director ?direct ; dbo:runtime ?runtime ; dbo:gross ?gross ; rdfs:label ?title . ` +
    `FILTER(?id = ${para}) ` +
    `FILTER langMatches(lang(?title),"en") ` +
    `FILTER langMatches(lang(?actorname),"en") ` +
    `FILTER langMatches(lang(?directname),"en") ` +
    `} LIMIT 100 `);
}

module.exports = {
    searchQuery,
    actorQuery,
    directorQuery,
    filmQuery
};
