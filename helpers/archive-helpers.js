var fs = require('fs');
var path = require('path');
var _ = require('underscore');

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  'siteAssets' : path.join(__dirname, '../web/public'),
  'archivedSites' : path.join(__dirname, '../archives/sites'),
  'list' : path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for jasmine tests, do not modify
exports.initialize = function(pathsObj){
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function(callback, url){
  fs.readFile(exports.paths.list, function(err, data){
    var urls = data.toString().split("\n");
    callback(urls, url);
  });
};

exports.isUrlInList = function(urls, url){
  for (var i = 0; i < urls.length; i++) {
    if (url === urls[i]) return true;
  }
  return false;
};

exports.addUrlToList = function(data){
  fs.writeFileSync(exports.paths.list, data.join("\n"));
};

exports.isURLArchived = function(urls, url){
  // return fs.readFile(exports.paths.list, function(err, data){
  //   var urls = data.toString().split("\n");
  //   for (var i = 0; i < urls.length; i++) {
  //     if (url === urls[i]) return true;
  //   }
  //   return false;
  // });
  for (var i = 0; i < urls.length; i++) {
    if (url === urls[i]) return true;
  }
  return false;
};

exports.downloadUrls = function(){

};













