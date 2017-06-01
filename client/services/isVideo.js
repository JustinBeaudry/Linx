'use strict';

const isVideo = require('./util/isVideoURL');

angular.module('linx').service('videoService', videoService);

function videoService($q) {
  return {
    all: isVideoURL
  };

  function isVideoURL(links) {
    return $q.all(links.map(link => isVideo(link)));
  }
}
