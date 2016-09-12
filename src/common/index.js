'use strict';

var angular = require('angular');

angular.module('common', [
  require('./assets.service'),
  require('./default.filter'),
  require('./url.filter')
]);

module.exports = 'common';
