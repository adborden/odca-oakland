'use strict';

var angular = require('angular');

function array_update (array, data) {
  Array.prototype.splice.apply(array, [0, array.length].concat(data));
}

function route (page) {
  return angular.extend({}, page, {
    controllerAs: 'vm'
  });
}

module.exports = {
  array_update: array_update,
  route: route
};
