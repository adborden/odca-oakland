var GoogleSpreadsheet = require('../gsheet');

function CommitteeController ($scope) {
  $scope.committees = [];

  var sheet = new GoogleSpreadsheet('committees');
  sheet.init(function () {
    sheet.getRows()
      .then(function (values) {
        Array.prototype.splice.apply($scope.committees, [0, $scope.committees.length].concat(values));
        $scope.$digest();
      });
  });
}

module.exports = {
  controller: CommitteeController
};
