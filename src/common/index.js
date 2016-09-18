'use strict';

var angular = require('angular');

angular.module('common', [
  require('./assets.service'),
  require('./default.filter'),
  require('./page_title.service'),
  require('./scroll_top'),
  require('./url.filter')
]);

module.exports = 'common';
