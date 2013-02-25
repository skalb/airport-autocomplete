var $ = require('jquery'),
    _ = require('underscore'),
    fs = require('fs'),
    ac = require('autocomplete');

exports.page = function(req, res) {
  res.render('index', { layout: 'layout', title: 'Airport Autocomplete' });
};

var namesAC = ac.connectAutocomplete(),
    airportNames = {},
    airportCodes = {};

fs.readFile('data/airport-codes.csv', function(err, data) {
  var airports = [];

  _.each(data.toString().split('\n'), function(a) {
    var parts = a.trim().split("|"),
        airportName = parts[0],
        airportNameLower = airportName.toLowerCase(),
        airportCode = parts[1];
        airportCodeLower = airportCode.toLowerCase(),
        fullName = airportCode + " - " + airportName;

    airportNames[airportNameLower] = fullName;
    airportCodes[airportCodeLower] = fullName;

    airports.push(airportNameLower);
    airports.push(airportCodeLower);
  });

  namesAC.initialize(function(onReady) {
    onReady(airports);
  });
});

exports.airports = function(req, res) {
  var airport = req.query["term"].toLowerCase(),
      results = namesAC.search(airport);

  var airportResults = _.map(results, function(a) {
    return airportNames[a] || airportCodes[a];
  });

  res.send(airportResults);
};