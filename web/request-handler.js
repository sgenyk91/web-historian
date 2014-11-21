var path = require('path');
var archive = require('../helpers/archive-helpers');
var helpers = require("./http-helpers");
var fs = require('fs');
// require more modules/folders here!

var statusCode = 200;

exports.handleRequest = function (req, res, route) {
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
    helpers.collectData(req, function(data) {
      console.log(data);
      var url = data.split('=')[1];
      archive.isUrlInList(url, function(found) {
        if (found) {
          archive.isURLArchived(url, function(exists) {
            if (exists) {
              statusCode = 302;
              // console.log('goes in exists');
              fs.readFile(archive.paths.archivedSites+'/'+url, function(err, data) {
                res.writeHead(statusCode, headers);
                res.write(data);
                res.end();
              });
            } else {
              fs.readFile(archive.paths.siteAssets + '/loading.html', function(err, data) {
                res.writeHead(statusCode, headers);
                res.write(data);
                res.end();
              });
            }
          });
        } else {
          archive.addUrlToList(url, function() {
            fs.readFile(archive.paths.siteAssets + '/loading.html', function(err, data) {
              res.writeHead(statusCode, headers);
              res.write(data);
              res.end();
            });
          });
        }
      });
    });
  }
};
