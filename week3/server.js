var express = require('express');
var app = express();

app.use(express.static('public'));
app.set('view engine', 'ejs');

app.get('/templatetest', function(req, res) {
	var data = {person: {name: "Shawn", other: "blah"}};
    res.render('template.ejs', data);
});


var count = 0;

var thesubmissions = [];

app.get('/formpost', function(req, res) {
  //res.send("You submitted " + req.query.textfield);
  thesubmissions.push(req.query.textfield);
  res.redirect('/display');
});

app.get('/display', function(req, res) {
  res.render('display.ejs', {thedata:thesubmissions});
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
