'use strict';

const bunyan = require('bunyan');
const path = require('path');

module.exports = bunyan.createLogger({
  name: 'linx-scrape',
  streams: [
    {
      level: 'trace',
      path: 'linx-scrape.log'
    },
    {
      level: 'error',
      path: path.join(nw.App.dataPath, 'linx-scrape.log')
    }
  ],
  serializers: bunyan.stdSerializers
});
