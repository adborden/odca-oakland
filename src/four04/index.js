'use strict';

var angular = require('angular');

angular.module('four04', [])
  .component('notFound', {
    template: require('./404.html')
  });

module.exports = 'four04';
