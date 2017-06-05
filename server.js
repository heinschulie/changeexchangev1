// var http = require('http');
// var express = require('express');
// var app = express();
// //app.use(express.static('ChangeExchange'));

// app.get('/', function (req, res) {
//   res.sendfile('index.html')
// });

// app.listen(3000);
// console.log('Server running!'); 

// 

// http.createServer(function(req, res){
//     res.writeHead(200,{'Content-Type': 'text/plain'});
//     if (req.url === "/file.txt")
//         fs.createReadStream(__dirname+ '/file.txt').pipe(res);
//     else
//         res.end('./index.html');
// }).listen(3000, process.env.IP); 
// console.log('Server running!'); 

var express = require('express'),
  app = express(),
  http = require('http'),
  httpServer = http.Server(app);

app.use(express.static(__dirname + '/content/css'));
app.use(express.static(__dirname + '/content/images'));
app.use(express.static(__dirname + '/scripts'));

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});
app.listen(3000);