var path = require('path');
var archive = require('../helpers/archive-helpers');
var helpers = require("./http-helpers");
var fs = require('fs');
// require more modules/folders here!

var statusCode = 200;

exports.handleRequest = function (req, res,route) {
  var headers = helpers.headers;
  // console.log(req);
  if (req.method === 'GET') {
    fs.readFile(archive.paths.siteAssets + route, function(err, data) {
      res.writeHead(statusCode, headers);
      res.write(data);
      res.end();
    });
  } else if (req.method === 'POST') {
    statusCode = 201;
    res.writeHead(statusCode, headers);
    res.end();
  } else if (req.method === 'OPTIONS') {
    res.writeHead(statusCode, headers);
    res.end();
  } else {
    res.end();
  }
};
