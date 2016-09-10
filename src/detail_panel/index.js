'use strict';

var angular = require('angular');
angular.module('detail_panel', [])
  .component('detailPanel', {
    template: require('./detail_panel.html'),
    controller: DetailPanelController,
    bindings: {
      detail: '='
    }
  });

function DetailPanelController () {
}


module.exports = 'detail_panel';
