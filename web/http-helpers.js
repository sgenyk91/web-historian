var path = require('path');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');

var headers = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10, // Seconds.
  'Content-Type': "text/html"
};
exports.headers = headers;

exports.serveAssets = function(res, asset, callback) {
  //dont touch this function
};

// As you progress, keep thinking about what helper functions you can put here!
