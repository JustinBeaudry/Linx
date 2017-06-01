'use strict';

const http = require('http');
const https = require('https');
const parse5 = require('parse5');
const url = require('url');
const path = require('path');
const log = require('./logger');

let cache = {};

module.exports = scrape;

function scrape(path) {
  const begin = now();
  log.trace('begin scrape', {
    url: path,
    datetime: begin
  });
  // make an http request to the target and simply inspect the contentType
  // if the targets contentType is text/html or text/plain, download it and parse
  // get all the links on the page of any kind, whether that's rtmp, http, https, etc.
  // return all these links
  return new Promise((resolve, reject) => {
    if (typeof path !== 'string') {
      return reject(new TypeError(`Parameter 'path' must be a string, not ${typeof path}`));
    }

    if (cache[path] && cache[path].ttl <= now()) {
      return resolve(cache[path].data);
    }

    const uri = url.parse(path);
    const options = {
      protocol: uri.protocol || 'http:',
      hostname: uri.hostname,
      path: uri.pathname
    };

    log.debug('options', {
      options: options
    });

    const request = (options.protocol === 'https:' ? https : http).request(options, (response) => {
      let document = '';

      // exit if not in 200-300 block
      if (response.statusCode <= 200 && response.statusCode >= 300) {
        return reject(new Error('returned a status code not in the 200-300 block.'));
      }
//      let contentType = response.headers['Content-Type'];
//      if (['text/html', 'text/plain'].indexOf(contentType) === -1) {
//        return reject(new Error(`requested resource is not the appropriate content-type. expected text/plain or text/html, got: ${contentType}`));
//      }
      response.setEncoding('utf-8');
      response.on('data', chunk => document += chunk);
      response.on('end', () => {
        // use parse5 to walk the DOM and extract all links
        log.trace('end scrape', {
          datetime: now(),
          duration: `${now() - begin}ms`
        });
        document = extractLinks(document);

        cache[path] = {};
        cache[path].ttl = now() + (1000 * 60 * 60 * 24);
        cache[path].data = document;

        resolve(document);
      });
    });

    request.on('error', reject);
    request.end();
  });
}

function extractLinks(dom) {
  let textNodes = [];

  _extractLinks(parse5.parse(dom));

  function _extractLinks(node) {
    if (node.nodeName === '#text') textNodes.push(node.value);
    if (node.attrs) {
      node.attrs.forEach(attr => {
        if (attr.name === 'href' || attr.name === 'src') {
          textNodes.push(attr.value);
        }
      });
    }
    if (node.childNodes && node.childNodes.length) {
      node.childNodes.forEach(childNode => {
        _extractLinks(childNode);
      });
    }
  }
  
  return textNodes.filter(isUrl);
}

function now() {
  return Math.floor(Date.now() / 1000);
}

function isUrl(uri) {
  return /\w*\.\w*\.\w*/.test(uri);
}
