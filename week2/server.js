var express = require('express');
var app = express();

app.use(express.static('public'));

var count = 0;

app.get('/formpost', function(req, res) {
  res.send("You submitted " + req.query.textfield);
});

app.get('/count', function(req, res) {
  count++;
  res.send("<html><body><h1>"+count+"</h1></body></html>");
});

app.get('/', function (req, res) {
  res.send('Hello World!')
});

app.get('/somethingelse', function(req, res) {
  res.send("Goodbye");

})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
});
