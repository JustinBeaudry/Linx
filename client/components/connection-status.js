'use strict';

angular.module('linx').directive('connectionStatus', connectionStatus);

function connectionStatus() {
  return {
    restrict: 'E',
    scope: {
      status: '='
    },
    template: `
      <div class="onoffswitch">
        <input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox" id="myonoffswitch">
        <label class="onoffswitch-label" for="myonoffswitch">
          <span class="onoffswitch-inner"></span>
          <span class="onoffswitch-switch"></span>
        </label>
      </div>
    `,
    controllerAs: 'ctrl',
    controller: function($element, $attrs) {

    }
  };
}