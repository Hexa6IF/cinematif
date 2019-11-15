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
    `SELECT DISTINCT ?movietitle ?idmovie WHERE { ` +

    `?movie a dbo:Film ; ` +
    `rdfs:label ?movietitle ; ` +
    `dbo:wikiPageID ?idmovie . ` +

    addFilters(filters) +
    `FILTER (lcase(str(?movietitle)) like '%${para}%') ` +
    `FILTER langMatches(lang(?movietitle),"en") ` +
    `} LIMIT 50`);
}

const actorQuery = (para) => {
  return (
    prefixes +
    `SELECT ?idactor ?actorname ?abstract ?movietitle ?idmovie ?thumb WHERE {` +
    `?actor dbo:wikiPageID ?idactor; `+
    `foaf:name ?actorname; ` +
    `^dbo:starring ?movie. ` +

    `OPTIONAL { ?actor dbo:thumbnail ?thumb }. ` +
    `OPTIONAL { ?actor dbo:asbtract ?abstract }. ` +

    `?movie a dbo:Film ; ` +
    `rdfs:label ?movietitle ; ` +
    `dbo:wikiPageID ?idmovie . ` +

    `FILTER langMatches(lang(?abstract), "en") ` +
    `FILTER langMatches(lang(?actorname),"en") ` +
    `FILTER langMatches(lang(?movietitle),"en") ` +
    `FILTER (?idactor = ${para}) ` +
    `} ` +
    `LIMIT 100`);
}

const directorQuery = (para) => {
  return (
    prefixes +
    `SELECT ?iddirect ?directname ?abstract ?movietitle ?idmovie ?thumb WHERE { ` +

    `?direct foaf:name ?directname ; ` +
    `dbo:wikiPageID ?iddirect ; ` +
    `foaf:name ?name; ` +
    `^dbo:director ?movie. ` +

    `OPTIONAL { ?direct dbo:thumbnail ?thumb }. ` +
    `OPTIONAL { ?direct dbo:asbtract ?abstract }. ` +
    
    `?movie a dbo:Film ; ` +
    `rdfs:label ?mctovietitle ; ` +
    `dbo:wikiPageID ?idmovie . ` +

    `FILTER langMatches(lang(?abstract), "en") ` +
    `FILTER langMatches(lang(?movietitle), "en") ` +
    `FILTER langMatches(lang(?directname), "en") ` +
    `FILTER(?iddirect = ${para}) ` +
    `} ` +
    `LIMIT 100`);
}

const filmQuery = (para) => {
  return (
    prefixes +
    `SELECT ?idmovie ?movietitle ?abstract ?year ?directname ?iddirect ?runtime ?gross ?idact ?actorname ?country WHERE {` +
    `?movie dbo:wikiPageID ?idmovie ; ` +
    `rdf:type dbo:Film ; ` +
    `rdfs:label ?movietitle . ` +

    `OPTIONAL { ?movie dbpedia2:recorded ?year }. ` +
    `OPTIONAL { ?movie dbpedia2:country ?country }. ` +
    `OPTIONAL { ?movie dbo:runtime ?runtime }. ` +
    `OPTIONAL { ?movie dbo:gross ?gross }. ` +
    `OPTIONAL { ?movie dbo:abstract ?abstract }. ` +

    `OPTIONAL { ?actor ^dbo:starring ?movie ; dbo:wikiPageID ?idact ; rdfs:label ?actorname . }. ` +
    `OPTIONAL { ?direct ^dbo:director ?movie ; dbo:wikiPageID ?iddirect ; rdfs:label ?directname . }. ` +

    `FILTER(?idmovie = ${para}) ` +
    `FILTER langMatches(lang(?movietitle),"en") ` +
    `FILTER langMatches(lang(?abstract), "en") ` +
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
