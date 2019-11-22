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
    let filter = ``;

    if(filters.country) {
        filter += `?movie dbpedia2:country ?country. FILTER(?country like '%${filters.country}%'). `
    }
    if(filters.year) {
        filter += `?movie dbpedia2:recorded ?year. FILTER(?year > ${filters.year}). `
    }
    return filter;
}

const searchQuery = (params) => {
  return (
    prefixes +
    `SELECT DISTINCT ?movietitle ?idmovie ?relatedmovie WHERE { ` +

    `?movie a dbo:Film ; ` +
    `rdfs:label ?movietitle ; ` +
    `dbo:wikiPageID ?idmovie . ` +

    addFilters(params.filters) +

    `FILTER (lcase(str(?movietitle)) like '%${params.title}%') ` +
    `FILTER langMatches(lang(?movietitle),"en") ` +
    `} LIMIT ${params.size} OFFSET ${params.size*(params.page-1)}`);
}

const actorQuery = (params) => {
  return (
    prefixes +
    `SELECT ?idactor ?actorname ?abstract ?movietitle ?idmovie ?thumb WHERE {` +
    `?actor dbo:wikiPageID ?idactor; `+
    `foaf:name ?actorname; ` +
    `^dbo:starring ?movie. ` +

    `OPTIONAL { ?actor dbo:thumbnail ?thumb }. ` +
    `OPTIONAL { ?actor dbo:abstract ?abstract. FILTER langMatches(lang(?abstract), "en")}. ` +

    `?movie a dbo:Film ; ` +
    `rdfs:label ?movietitle ; ` +
    `dbo:wikiPageID ?idmovie . ` +

    `FILTER langMatches(lang(?actorname),"en") ` +
    `FILTER langMatches(lang(?movietitle),"en") ` +
    `FILTER (?idactor = ${params}) ` +
    `} ` +
    `LIMIT 100`);
}

const directorQuery = (params) => {
  return (
    prefixes +
    `SELECT ?iddirect ?directname ?abstract ?movietitle ?idmovie ?thumb WHERE { ` +

    `?direct foaf:name ?directname ; ` +
    `dbo:wikiPageID ?iddirect ; ` +
    `foaf:name ?name; ` +
    `^dbo:director ?movie. ` +

    `OPTIONAL { ?direct dbo:thumbnail ?thumb }. ` +
    `OPTIONAL { ?direct dbo:abstract ?abstract. FILTER langMatches(lang(?abstract), "en")}. ` +

    `?movie a dbo:Film ; ` +
    `rdfs:label ?movietitle ; ` +
    `dbo:wikiPageID ?idmovie . ` +

    `FILTER langMatches(lang(?movietitle), "en") ` +
    `FILTER langMatches(lang(?directname), "en") ` +
    `FILTER(?iddirect = ${params}) ` +
    `} ` +
    `LIMIT 100`);
}

const filmQuery = (params) => {
  return (
    prefixes +
    `SELECT ?idmovie ?movietitle ?relatedidmovie ?relatedmovietitle ?abstract ?year ?directname ?iddirect ?runtime ?gross ?idact ?actorname ?country WHERE {` +

    `?movie a dbo:Film ; ` +
    `rdfs:label ?movietitle ; ` +
    `dbo:wikiPageID ?idmovie . ` +

    `OPTIONAL { ?movie dbpedia2:recorded ?year }. ` +
    `OPTIONAL { ?movie dbpedia2:country ?country }. ` +
    `OPTIONAL { ?movie dbo:runtime ?runtime }. ` +
    `OPTIONAL { ?movie dbo:gross ?gross }. ` +
    `OPTIONAL { ?movie dbo:abstract ?abstract. FILTER langMatches(lang(?abstract), "en") }. ` +

    `OPTIONAL { ?actor ^dbo:starring ?movie ; dbo:wikiPageID ?idact ; rdfs:label ?actorname. FILTER langMatches(lang(?actorname),"en")}. ` +
    `OPTIONAL { ?director ^dbo:director ?movie ; dbo:wikiPageID ?iddirect ; rdfs:label ?directname . ?relatedmovie ^dbo:director ?director ; rdfs:label ?relatedmovietitle ; dbo:wikiPageID ?relatedidmovie . FILTER langMatches(lang(?directname),"en") FILTER langMatches(lang(?relatedmovietitle),"en") }. ` +

    `FILTER(?idmovie = ${params}) ` +
    `FILTER langMatches(lang(?movietitle),"en") ` +
    `} LIMIT 100 `);
}

module.exports = {
    searchQuery,
    actorQuery,
    directorQuery,
    filmQuery
};
