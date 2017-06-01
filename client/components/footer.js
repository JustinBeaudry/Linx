'use strict';

angular.module('linx')
  .directive('linxFooter', linxFooter);

function linxFooter() {
  return {
    restrict: 'E',
    template: `
      <footer class="row">
        <div class="col-xs-6 col-xs-offset-3">
          <small class="text-center">This software is provided AS-IS. Linx logo by Viktor Vorobyev from the Noun Project.</small>
        </div>
      </footer>
    `
  };
}
