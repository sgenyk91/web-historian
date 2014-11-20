var http = require("http");
var handler = require("./request-handler");
// var helpers = require("./http-helpers");
// var url = require("url");

var port = 8080;
var ip = "127.0.0.1";
// DOES NOT HAVE DEFAULT CORSs

// var router = {
//   "/archives": handler.handleRequest
// };
var server = http.createServer(handler.handleRequest);
// var server = http.createServer(function(request, response) {
//   var route = router[url.parse(request.url).pathname];
//   if (route) {
//     route(request, response);
//   } else {
//     helpers.sendReponse(response, "Not Found", 404);
//   }
// });
console.log("Listening on http://" + ip + ":" + port);
server.listen(port, ip);
