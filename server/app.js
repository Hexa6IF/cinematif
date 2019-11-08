
const express = require('express')
const app = express();
const fetch = require('node-fetch');
const fs = require('file-system');
const path = require('path');
const port = process.env.PORT || 5000;
const SparqlParser = require('sparqljs').Parser;
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

app.get('/api/search/:query', (req, res) => {
  console.log(req.params.id);
  res.send('Ok');
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



/* Server */

app.listen(port, (req, res) => {
  logger.info(`Server listening on port: ${port}`);
  console.log(`Server listening on port: ${port}`);
})
