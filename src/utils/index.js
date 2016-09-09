'use strict';

function array_update (array, data) {
  Array.prototype.splice.apply(array, [0, array.length].concat(data));
}

function route (page) {
  return {
    template: page.template,
    controller: page.controller,
    controllerAs: 'vm',
    resolve: page.resolve || {}
  };
}

module.exports = {
  array_update: array_update,
  route: route
};
