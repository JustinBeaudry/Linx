'use strict';

const bunyan = require('bunyan');
const path = require('path');

module.exports = bunyan.createLogger({
  name: 'linx-is-video',
  streams: [
    {
      level: 'trace',
      path: 'linx-is-video.log'
    },
    {
      level: 'error',
      path: path.join(nw.App.dataPath, 'linx-is-video.log')
    }
  ],
  serializers: bunyan.stdSerializers
});
