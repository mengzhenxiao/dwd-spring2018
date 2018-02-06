
var config = require('./config.js');
console.log(config);

var mongojs = require('mongojs');
var express = require('express');
var app = express();

var db = mongojs("dwd-spring2018:password@ds125588.mlab.com:25588/dwd-spring2018", ["thesubmissions"]);
// db.thesubmissions.save({"test":"a test"}, function(err, saved) {
//   if( err || !saved ) console.log("Not saved");
//     else console.log("Saved");
// });

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
  // thesubmissions.push(req.query.textfield);

  db.thesubmissions.save({"submission":req.query.textfield}, function(err, saved) {
    if( err || !saved ) console.log("Not saved");
      else console.log("Saved");
  });

  res.redirect('/display');
});

app.get('/display', function(req, res) {

  db.thesubmissions.find({}, function(err, saved) {
    if (err || !saved) {
    	console.log("No results");
    }
    else {
      console.log(saved);
      res.render('display.ejs', {thedata:saved});

    	// saved.forEach(function(record) {
      // 	console.log(record);
    	// });

    	/* Alternatively you could loop through the records with a "for"
    	for (var i = 0; i < saved.length; i++) {
  	  	console.log(saved[i]);
  	}
  	*/
    }
  });

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
