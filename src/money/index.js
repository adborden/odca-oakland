'use strict';

var angular = require('angular');
angular.module('money', [])
  .component('moneyByRegion', {
    template: require('./money_by_region.html'),
    controller: MoneyByRegionController,
    bindings: {
      color: '@',
      money: '='
    }
  })
  .filter('dollar', function ($filter) {
    // Shortcut for whole-dollar formatting
    return function (money) {
      return $filter('currency')(money, '$', 0);
    };
  })
  .directive('moneyBar', function () {
    return {
      template: require('./money_bar.html'),
      controller: MoneyBarController,
      link: link,
      bindToController: true,
      controllerAs: '$ctrl',
      scope: {
        color: '@', // One of green, red, blue
        format: '@', // How to format the value, money or percentage
        max: '@', // The maximum value (what counts as 100%) and is used to scale the measure
        value: '@' // The value to visualize
      }
    };

    function link (scope, element, attrs, ctrl) {
      scope.$watch('$ctrl.value', function (value) {
        updateMeasure(value);
      });

      function updateMeasure (value) {
        value = parseInt(value || 0);

        var available_width  = 280;
        angular.element(element).find('.money-bar__measure').width(Math.min(value / ctrl.max * available_width , available_width));
      }
    }
  });

function MoneyBarController ($filter) {
  var ctrl = this;
  ctrl.$onInit = init;
  ctrl.displayValue = displayValue;

  function init () {
    // Set defaults
    ctrl.color = ctrl.color || 'blue';
    ctrl.max = ctrl.max || 100;
  }

  function displayValue() {
    return format(ctrl.format, ctrl.value);
  }

  function format (format, value) {
    if (format === 'percentage') {
      return $filter('number')(value / ctrl.max * 100, 0) + '%';
    } else if (format === 'money') {
      return $filter('dollar')(value);
    } else {
      return '' + value;
    }
  }
}

function MoneyByRegionController ($scope) {
  var ctrl = this;
  ctrl.total = 0;

  $scope.$watch('$ctrl.money', function (money) {
    if (!money) {
      return;
    }

    ctrl.total = money.within_oakland + money.within_california + money.out_of_state;
  });
}

module.exports = 'money';
