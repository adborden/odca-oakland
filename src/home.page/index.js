'use strict';

var angular = require('angular');
angular.module('home.page', [])
  .component('homePage', {
    template: require('./home.html')
  });


module.exports = 'home.page';
