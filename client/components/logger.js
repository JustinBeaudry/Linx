'use strict';

const bunyan = require('bunyan');

module.exports = bunyan.createLogger({
  name: 'linx-client',
  serializer: bunyan.stdSerializers,
  streams: [
    {
      level: 'trace',
      stream: process.stdout
    },
    {
      level: 'error',
      path: 'linx-client.log'
    }
  ],
});
