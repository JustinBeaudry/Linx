'use strict';

angular.module('linx').directive('linxLoader', linxLoader);

function linxLoader() {
  return {
    restrict: 'E',
    template: `
      <section class="loading">
        <div class="blob blob-0"></div>
        <div class="blob blob-1"></div>
        <div class="blob blob-2"></div>
        <div class="blob blob-3"></div>
        <div class="blob blob-4"></div>
        <div class="blob blob-5"></div>
        <p style="position: absolute;top:calc(55%);left:calc(50% - 40px);">Loading...</p>
      </section>
    `
  };
}
