var express= require ('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var path = require('path');
//var window = require('window');
var connection = require('C:/Users/rujul/Desktop/ele/final/proj/election/src/config');
var app= express();
app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true 
}));

app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());
app.get('/', function(request, response) {
	
	response.sendFile(path.join(__dirname + '/index.html'));
});
app.post('/auth', function(request, response) {
	var username = request.body.username;
	var password = request.body.password;
	if (username && password) {
		connection.query('SELECT * FROM voter WHERE accountno = ? AND voterid = ?', [username, password], function(error, results, fields) {
			if (results.length > 0) {
				request.session.loggedin = true;
				request.session.username = username;
				response.redirect('http://127.0.0.1:5500/election/src/index2.html');
				//response.redirect('https://www.geeksforgeeks.org');
			} else {
				
				//alert("Incorrect Username and/or Password! Go Back and Login!");
				response.send('Incorrect Username and/or Password! Go Back and Login!');
				
				//response.redirect('./');
				
			}			
			response.end();
		});
	} else {
		response.send('Please enter Username and Password!');
		response.end();
	}
});

app.get('/home', function(request, response) {
	if (request.session.loggedin) {
		//location.assign("https://www.geeksforgeeks.org");
		//response.send('Please login ');
		
	} else {
		response.send('Please login to view this page!');
	}
	response.end();
});


app.listen(3000);
