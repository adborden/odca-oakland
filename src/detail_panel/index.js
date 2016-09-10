'use strict';

var angular = require('angular');
angular.module('detail_panel', [])
  .component('detailPanel', {
    template: require('./detail_panel.html'),
    controller: DetailPanelController,
    bindings: {
      detail: '='
    }
  })
  .component('officeDetail', {
    template: require('./office_detail.html'),
    controller: OfficeDetailController,
    bindings: {
      office: '='
    }
  })
  .component('referendumDetail', {
    template: require('./referendum_detail.html'),
    controller: ReferendumDetailController,
    bindings: {
      referendum: '='
    }
  });


function DetailPanelController () {
}

function OfficeDetailController () {
}

function ReferendumDetailController () {
}


module.exports = 'detail_panel';
