'use strict';

const http = require('http');
const https = require('https');
const url = require('url');
const log = require('./logger');

module.exports = isVideo;

function isVideo(link) {
  console.info('isVideo()');
  log.trace('isVideo start');
  return new Promise((resolve, reject) => {
    if (typeof link !== 'string') return reject(new TypeError('expected link to be a string'));
    const uri = url.parse(link);
    const options = {
      protocol: uri.protocol || 'http:',
      hostname: uri.hostname || uri.pathname,
      path: uri.pathname,
      timeout: 2000
    };
    if (options.protocol === 'rtmp:') {
      return resolve(true);
    }
    console.info('making request', {
      options: options
    });
    log.trace('making request', {
      options: options
    });
    const request = (options.protocol === 'https:' ? https : http).request(options, response => {
      console.info('request complete', {
        res: response
      });
      log.trace('request complete', {
        res: response
      });
      // exit if not in 200-300 block
      if (response.statusCode <= 200 && response.statusCode >= 300) {
        return resolve(false);
      }
      resolve(response.headers['Content-Type']);
    });
    request.on('error', err => {
      log.error('error with isVideo request', {
        err: err
      });
      resolve(false);
    });
    request.end();
  });
}
