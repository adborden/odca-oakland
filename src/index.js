/* src/js/index.js
 *
 * Add  your custom javascript here. This file is only loaded on the home page
 * unless you add a `javascript` property to your page's front matter.
 **/

'use strict';

var angular = require('angular');
var GoogleSpreadsheet = require('./gsheet');


angular.module('odca', [])
  .run(function ($rootScope) {
    $rootScope.text = 'hello world';
    $rootScope.foo = { text: 'hi hi'};
  })
  .controller('home', function ($scope) {
    $scope.candidates = [];

    var sheet = new GoogleSpreadsheet('1272oaLyQhKwQa6RicA5tBso6wFruum-mgrNm3O3VogI');
    sheet.init(function () {
      sheet.getHeaders()
        .then(function () {
          sheet.getColumn('Candidate').then(function (values) {
            Array.prototype.splice.apply($scope.candidates, [0, $scope.candidates.length].concat(values));
            $scope.$digest();
          });
        });
    });
  })
  .controller('candidates', require('./candidates').controller)
  .controller('committees', require('./committees').controller);
