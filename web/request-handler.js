var path = require('path');
var archive = require('../helpers/archive-helpers');
var helpers = require("./http-helpers");
var fs = require('fs');
// require more modules/folders here!

var statusCode = 200;

exports.handleRequest = function (req, res, route) {

  var headers = helpers.headers;

  var readFileFunction = function(urlPath) {
    fs.readFile(urlPath, function(err, data) {
      res.writeHead(statusCode, headers);
      res.write(data);
      res.end();
    });
  };

  // console.log(req);
  if (req.method === 'GET') {
    var urlPath = archive.paths.siteAssets + route;
    readFileFunction(urlPath);
  } else if (req.method === 'POST') {
    statusCode = 201;
    helpers.collectData(req, function(data) {
      console.log(data);
      var url = data.split('=')[1];
      archive.isUrlInList(url, function(found) {
        if (found) {
          archive.isURLArchived(url, function(exists) {
            if (exists) {
              statusCode = 302;
              var urlPath = archive.paths.archivedSites+'/'+url;
              readFileFunction(urlPath);
            } else {
              var urlPath = archive.paths.siteAssets + '/loading.html';
              readFileFunction(urlPath);
            }
          });
        } else {
          archive.addUrlToList(url, function() {
            var urlPath = archive.paths.siteAssets + '/loading.html';
            readFileFunction(urlPath);
          });
        }
      });
    });
  }
};




















