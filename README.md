# Cin'IFile

A webapp built using JQuery and NodeJs/Express that uses DBPedia to search movies and make recommendations

## Execution

There are two ways to execute the application locally on your machine :

1. Using `Docker-Compose` and `Make` :
- `make prod` to build and mount the docker container
- This requires `Make`, `Docker` and `Docker-Compose`

2. Using `nodeJS` and `npm` :
- `cd server` to enter server folder
- `npm install` to install node dependencies locally
- `node app.js` to launch the server

Afterwards, the application will be available at `http://localhost:5000/`

## Software/Libraries used

### Client side
- Bootstrap 3
- JQuery 3
- Font Awesome 4

Note - A template from `templatemo.com` was used initially for some of the pages of the application but the templates were heavily modified afterwards.

### Server side
- NodeJs
- PM2 (optional)
- Express 4
- Winston
- Dbpedia-sparql-client
- DotEnv 7