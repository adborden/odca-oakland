/* src/js/index.js
 *
 * Add  your custom javascript here. This file is only loaded on the home page
 * unless you add a `javascript` property to your page's front matter.
 **/

'use strict';

var angular = require('angular');


angular.module('odca', [])
  .config(function ($locationProvider) {
    $locationProvider.html5Mode(false).hashPrefix('!');
  })
  .controller('home', function () {
  })
  .controller('candidates', require('./candidates').controller)
  .controller('committees', require('./committees').controller);
