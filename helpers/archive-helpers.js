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

exports.readListOfUrls = function(callback){
  fs.readFile(exports.paths.list, function(err, data){
    var urls = data.toString().split("\n");
    callback(urls);
  });
};

exports.isUrlInList = function(url, callback){
  exports.readListOfUrls(function(urls) {
    var found = _.any(urls, function(site, i) {
      return site.match(url);
    });
    callback(found);
  });
};

exports.addUrlToList = function(url, callback){
  fs.appendFile(exports.paths.list, url+'\n', function(err, file){
    callback();
  });
};

exports.isURLArchived = function(url, callback){ //NEED TO CHANGE ARCHIVE
  // return fs.readFile(exports.paths.list, function(err, data){
  //   var urls = data.toString().split("\n");
  //   for (var i = 0; i < urls.length; i++) {
  //     if (url === urls[i]) return true;
  //   }
  //   return false;
  // });
  var sitePath =  path.join(exports.paths.archivedSites, url);

  fs.exists(sitePath, function(exists) {
    callback(exists);
  });
};

exports.downloadUrls = function(urls){
  _.each(urls, function(url) {
    if(!url){ return; }
    request('http://' + url).pipe(fs.createWriteStream(exports.paths.archivedSites + "/" + url));
  });
  return true;
};













