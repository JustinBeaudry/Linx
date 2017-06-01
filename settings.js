'use strict';

const fs = require('fs');
const path = require('path')
const log = require('./logger');

const SETTINGS_FILE = path.join(nw.App.dataPath, 'settings.json');
const DEFAULT_SETTINGS = {
  links: [],
  urls: [
    'http://www.m3uliste.pw' // default link
  ],
  initialLoad: true
};

// on start, ensure that settings.json exists
if (!fs.existsSync(SETTINGS_FILE)) {
  fs.writeFileSync(SETTINGS_FILE, JSON.stringify(DEFAULT_SETTINGS, null, 2), 'utf-8');
}

let cache = {};

module.exports = {
  get: getSettings,
  set: setSettings
};

/**
 * @param force - force a cache refresh
 * @returns {Promise}
 */
function getSettings(force) {
  return new Promise((resolve, reject) => {
    console.info('getSettings()');
    let settings = null;
    if (cache && Object.keys(cache).length > 0 && !force) {
      return resolve(cache);
    }
    fs.readFile(SETTINGS_FILE, (err, file) => {
      if (err) {
        return reject(err);
      }
      if (!file) {
        return reject(new Error('App settings not found'));
      }
      try {
        settings = JSON.parse(file);
      } catch(e) {
        if (e) {
          return reject(e);
        }
      }
      if (settings) {
        cache = settings;
      }
      resolve(settings);
    });
  });
}

/**
 * @param update - {Object} settings update object
 * @returns {Promise}
 */
function setSettings(update) {
  console.info('setSettings()', update);
  console.info('update type', typeof update);
  return new Promise((resolve, reject) => {
    if (typeof update !== 'object') {
      return reject(new TypeError('expected update to be an object'));
    }
    getSettings(true).then((settings) => {
      update = Object.assign(settings, update);
      try {
        update = JSON.stringify(update, null, 2);
      } catch(e) {
        return reject(e);
      }
      fs.writeFile(SETTINGS_FILE, update, (err) => {
        if (err) {
          return reject(err);
        }
        resolve();
      });
    });
  });
}
