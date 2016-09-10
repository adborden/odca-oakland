'use strict';

var angular = require('angular');
angular.module('money', [])
  .component('moneyByRegion', {
    template: require('./money_by_region.html'),
    bindings: {
      money: '='
    }
  });

module.exports = 'money';
