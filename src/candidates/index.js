var GoogleSpreadsheet = require('../gsheet');

function CandidateController ($scope) {
  $scope.candidates = [];

  var sheet = new GoogleSpreadsheet('candidates');
  sheet.init(function () {
    sheet.getRows()
      .then(function (values) {
        Array.prototype.splice.apply($scope.candidates, [0, $scope.candidates.length].concat(values));
        $scope.$digest();
      });
  });
}

module.exports = {
  controller: CandidateController
};
