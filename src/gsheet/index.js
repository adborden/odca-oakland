
var swagger_url = 'https://sheets.googleapis.com/$discovery/rest?version=v4';
var _ = require('lazy.js');


var google = window.gapi;
function GoogleSpreadsheet () {
}


GoogleSpreadsheet.prototype = {
  init: function (cb) {
    google.load('client', function () {
      google.client.load(swagger_url)
        .then(function () {
          google.client.setApiKey('AIzaSyDeu7RdmpSHbPeZOstyFGtahkmZD4KC7LA');
          google.client.sheets.spreadsheets.values.get({
            spreadsheetId: '1cLBERT60-mvIb6k0jasXITEwTuNQ-8iQ4DTeCePyPa4',
            range: '1:1'
          }).then(cb);
        });
    });
  },
  getHeaders: function () {
    var self = this;
    return google.client.sheets.spreadsheets.values.get({
      spreadsheetId: '1cLBERT60-mvIb6k0jasXITEwTuNQ-8iQ4DTeCePyPa4',
      range: '1:1'
    })
    .then(function (response) {
      self._headers = response.result.values[0];
      return response.result.values[0];
    });
  },
  getColumn: function (columnName) {
    var column = this._intToColumn(this._headers.indexOf(columnName));
    var range = column + ':' + column;
    var self = this;

    return google.client.sheets.spreadsheets.values.get({
      spreadsheetId: '1cLBERT60-mvIb6k0jasXITEwTuNQ-8iQ4DTeCePyPa4',
      range: range
    }).then(function (response) {
      return _(response.result.values.slice(1))
        .map(function (row) {
          return self._mapRowToObject(row, [columnName]);
        })
        .toArray();
    });
  },
  _intToColumn: function (x) {
    var columns = [];
    while (true) { // eslint-disable-line
      columns.unshift(String.fromCharCode(x % 26 + 65));
      if (x < 26) {
        break;
      }

      x = x / 26;
    }

    return columns.join('');
  },
  _mapRowToObject: function (row, headers) {
    if (!headers) {
      headers = this._headers;
    }

    return _(row)
      .map(function (x, idx) {
        return [headers[idx], x];
      })
      .toObject();
  }
};

module.exports = GoogleSpreadsheet;
