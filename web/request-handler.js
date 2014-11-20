var path = require('path');
var archive = require('../helpers/archive-helpers');
var helpers = require("./http-helpers");
// require more modules/folders here!

var statusCode = 200;

var data = {};

exports.handleRequest = function (req, res) {
  if (req.methods === 'GET') {
    helpers.sendResponse(res, data, statusCode);
  } else if (req.methods === 'POST') {
    statusCode = 201;
    helpers.sendResponse(res, data, statusCode);
  } else if (req.methods === 'OPTIONS') {
    helpers.sendResponse(res, data, statusCode);
  }

  res.end(archive.paths.list);
};
