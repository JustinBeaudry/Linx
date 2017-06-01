'use strict';

const bunyan = require('bunyan');
const path = require('path');

module.exports = bunyan.createLogger({
  name: 'linx-scrape',
  streams: [
    {
      level: 'trace',
      path: 'linx-settings.log'
    },
    {
      level: 'error',
      path: path.join(nw.App.dataPath, 'linx-settings.log')
    }
  ],
  serializers: bunyan.stdSerializers
});
