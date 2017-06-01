'use strict';

const scrape = require('./index');
const util = require('util');
const log = require('./logger');

scrape(process.argv[2])
  .then(data => {
    console.info(data);
    process.exit(0);
  })
  .catch(err => {
    log.error({
      err: err
    })
    process.exit(1);
  });

process.on('uncaughtException', err => log.error('uncaughtException', { err: err }));