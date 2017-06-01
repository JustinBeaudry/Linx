'use strict';

const url = require('url');
const settings = require('./settings');
const DEFAULT_SETTINGS = {
  urls: []
};

angular.module('linx').directive('linxApp', linxApp);

function linxApp($q, linkService, videoService, $interval) {
  return {
    restrict: 'E',
    template: `
      <section class="app">
        <section ng-if="!ctrl.loading">
          <linx-header></linx-header>
          <section class="row">
            <div class="col-xs-12">
              <form class="form-horizontal" ng-submit="ctrl.submit()">
                <h1>Add Links</h1>
                <p>Enter a web address: <i>(click ADD or press ENTER)</i></p>
                <div class="form-group">
                  <div class="col-xs-10">
                    <input class="form-control" type="url" placeholder="Web Address" ng-model="ctrl.url" uib-typeahead="url for url in ctrl.settings.urls | filter: $viewValue" >
                  </div>
                  <div class="col-xs-2">
                    <button type="submit" class="btn btn-success" ng-disabled="ctrl.submitted"><i class="fa fa-plus"></i> Add</button>
                  </div>
                </div>
              </form>
            </div>
          </section>
          <section>
            <link-list ng-if="ctrl.links.length" links="ctrl.links"></link-list>
            <div class="bg-warning col-xs-12" ng-if="!ctrl.submitted && ctrl.hasSubmitted && ctrl.links.length === 0 && !ctrl.error">
              <p class="text-warning">
                No links found with given Web Address.
              </p>
            </div>
            <div class="bg-danger col-xs-12" ng-if="ctrl.error">
              <p class="text-danger" ng-bind="ctrl.error"></p>
            </div>
          </section>
          <linx-footer></linx-footer>
        </section>
        <section ng-if="ctrl.loading">
          <div class="text-center">
            <img class="logo-img" src="./icon.png">
            <span class="logo">LINX</span>
          </div>
          <linx-loader></linx-loader>
        </section> 
      </section>
    `,
    controllerAs: 'ctrl',
    controller: function() {
      let self = this;

      angular.extend(this, {
        links: [],
        url: '',
        settings: DEFAULT_SETTINGS,
        submit: submit,
        submitted: false,
        error: null,
        hasSubmitted: false,
        loading: false
      });

      loadSettings();

      $interval(() => {
        console.info('checking loading state', self.loading);
      }, 2000);

      function loadSettings() {
        self.loading = true;
        console.info('loadingSettings()');
        const deferred = $q.defer();
        settings
          .get()
          .then(config => {
            console.info('response from settings', config);
            self.settings = config || DEFAULT_SETTINGS;
            self.loading = false;
            console.info('settings loaded!', self.settings);
          })
          .catch(err => {
            self.error = err;
            self.loading = false;
            console.error('error loading settings', self.error);
          })
        return deferred.promise;
      }

      function submit() {
        console.info('submit()');
        if (!angular.isString(self.url) || self.url === '') return;
        if (self.error) self.error = null;
        if (self.links) self.links = [];

        console.info('submitting url and updating settings', self.url);

        self.loading = true;
        self.submitted = true;
        self.hasSubmitted = true;

        const uri = url.parse(self.url);
        const uriOpts = {
          hostname: uri.hostname || uri.pathname,
          protocol: uri.protocol || 'http:'
        };

        self.url = uri.format(uriOpts);

        self.settings.urls.push(self.url);

        settings
          .set(self.url)
          .then(() => {
            console.info('settings updated!', self.settings);
            linkService
              .find(self.url)
              .then(links => {
                console.info('links found!', links);
                console.info('filtering video links');
                return videoService.isVideoURL(links);
              })
              .catch(err => {
                self.error = err;
                self.loading = false;
              })
              .then(isVideos => {
                self.links = links.filter((link, i) => isVideos[i]);
                console.info('videos filtered!', self.links);
              })
              .catch(err => {
                self.error = err;
                self.loading = false;
              })
              .finally(() => {
                self.submitted = false;
                self.loading = false;
                console.info('urls found and video links found!');
              });
          })
          .catch(err => {
            self.error = err;
            self.loading = false;
            console.error('error updating settings', self.error);
          });
      }
    }
  };
}
