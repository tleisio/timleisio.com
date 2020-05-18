// Dependencies
var express = require('express');
var app = express();
var port = process.env.PORT || 3000;
var server;

app.use(express.static('public'));

app.get('/', function(req, res) {
  res.sendFile('index.html');
});

// 404

// Start the server.
server = app.listen(port, function() {
  console.log("Server Start: " + port);
});
