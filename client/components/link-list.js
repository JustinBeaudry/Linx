'use strict';

angular.module('linx').directive('linkList', linkList);

function linkList() {
  return {
    restrict: 'E',
    scope: {
      links: '='
    },
    template: `
      <ul class="list-unstyled">
        <li ng-repeat="link in ctrl.links track by $index" ng-bind="link"></li>
      </ul>
    `,
    controllerAs: 'ctrl',
    controller: function($scope) {
      this.links = $scope.links;
    }
  };
}
