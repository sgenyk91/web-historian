var http = require("http");
var handler = require("./request-handler");
var helpers = require("./http-helpers");
var url = require("url");

var port = 8080;
var ip = "127.0.0.1";
var headers = helpers.headers;

var router = {
  "/": "/index.html",
  "/styles.css": "/styles.css"
};
// var server = http.createServer(handler.handleRequest);
var server = http.createServer(function(req, res) {
  // console.log(req.url);
  var route = router[url.parse(req.url).pathname];
  // console.log('route', route);
  if (route) {
    handler.handleRequest(req, res, route);
    // route(req, res);
  } else {
    console.log('entering 404');
    res.writeHead(404, headers);
    res.end();
  }
});
console.log("Listening on http://" + ip + ":" + port);
server.listen(port, ip);
