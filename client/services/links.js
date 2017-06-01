'use strict';

const settingService = require('./settings');
const linkScrape = require('./scrape/index');

angular.module('linx').service('linkService', linkService);

function linkService($q) {
  return {
    find: findLinks,
    get: getLinks,
    set: setLinks
  };

  /**
   *
   * @param url
   * @returns {Promise}
   */
  function findLinks(url) {
    const deferred = $q.defer();
    linkScrape(url)
      .then(deferred.resolve)
      .catch(deferred.reject);
    return deferred.promise;
  }

  /**
   *
   * @returns {Promise}
   */
  function getLinks() {
    const deferred = $q.defer();
    settingService
      .get()
      .then(settings => {
        deferred.resolve(settings && settings.links);
      })
      .catch(deferred.reject);
    return deferred.promise;
  }

  /**
   *
   * @param links
   * @returns {Promise}
   */
  function setLinks(links) {
    const deferred = $q.defer();
    settingService
      .set({
        links: links
      })
      .then(deferred.resolve)
      .catch(deferred.reject);
    return deferred.promise;
  }
}
