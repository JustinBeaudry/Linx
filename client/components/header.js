'use strict';

angular.module('linx').directive('linxHeader', linxHeader);

function linxHeader() {
  return {
    restrict: 'E',
    scope: {
      status: '='
    },
    template: `
      <header class="row">
        <div class="col-xs-8">
          <img class="logo-img" src="./icon.png">
          <span class="logo">LINX</span>
        </div>
        <connection-status class="pull-right" status="ctrl.status"></connection-status>
      </header>
    `,
    controllerAs: 'ctrl',
    controller: function($element, $attrs) {

    }
  };
}
