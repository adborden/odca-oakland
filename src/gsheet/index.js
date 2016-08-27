
var swagger_url = 'https://sheets.googleapis.com/$discovery/rest?version=v4';
var _ = require('lazy.js');


var google = window.gapi;
var spreadsheetId = '1cLBERT60-mvIb6k0jasXITEwTuNQ-8iQ4DTeCePyPa4';
var api_key = 'AIzaSyDeu7RdmpSHbPeZOstyFGtahkmZD4KC7LA';

function GoogleSpreadsheet (sheet) {
  this.sheet = sheet;
}


GoogleSpreadsheet.prototype = {
  init: function (cb) {
    var self = this;
    google.load('client', function () {
      google.client.load(swagger_url)
        .then(function () {
          google.client.setApiKey(api_key);
          return self.getHeaders().then(cb);
        });
    });
  },

  _get: function (options) {
    var defaults = {
      spreadsheetId: spreadsheetId
    };

    if (options.range) {
      options.range = this._range(options.range);
    }

    return google.client.sheets.spreadsheets.values.get(_({})
      .extend(defaults)
      .extend(options)
      .toObject()
    );

  },

  _range: function (range) {
    if (this.sheet) {
      range = this.sheet + '!' + range;
    }

    return range;
  },

  getHeaders: function () {
    var self = this;
    // TODO return a promise with cached value
    return this._get({range: '1:1'})
      .then(function (response) {
        self._headers = response.result.values[0]
          .map(function (value) {
            return self._normalizeName(value);
          });
        return self._headers;
      });
  },

  getRows: function (limit) {
    if (!limit) {
      limit = 200;
    }

    var cells = this._headers.length;
    var end = this._intToColumn(cells);
    var range = 'A1:' + end + limit;

    var self = this;
    return this._get({range: range})
      .then(function (response) {
        return _(response.result.values.slice(1))
          .map(function (row) {
            return self._mapRowToObject(row);
          })
          .toArray();
      });
  },

  getColumn: function (columnName) {
    columnName = this._normalizeName(columnName);
    var column = this._intToColumn(this._headers.indexOf(columnName));
    var range = column + ':' + column;
    if (this.sheet) {
      range = this.sheet + '!' + range;
    }

    var self = this;
    return this._get({range: range})
      .then(function (response) {
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
  },
  _normalizeName: function (name) {
    return name.toLowerCase().replace(/\s/g, '_').replace(/[^a-z0-9_]/g, '');
  }
};

module.exports = GoogleSpreadsheet;
