'use strict';

function array_update (array, data) {
  Array.prototype.splice.apply(array, [0, array.length].concat(data));
}

module.exports = {
  array_update: array_update
}
