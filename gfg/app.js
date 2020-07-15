//alert ("HI");
var express=require("express"); 
var bodyParser=require("body-parser"); 

const mongoose = require('mongoose'); 
mongoose.connect('mongodb://localhost:27017/mydb'); 
var db=mongoose.connection; 
db.on('error', console.log.bind(console, "connection error")); 
db.once('open', function(callback){ 
	console.log("connection succeeded"); 
}) 

var app=express() 
app.use(express.static(__dirname));

app.use(bodyParser.json()); 
app.use(express.static('public')); 
app.use(bodyParser.urlencoded({ 
	extended: true
})); 

app.post('/sign_up', function(req,res){ 
	var name = req.body.name; 
	var email =req.body.email; 
	var candidatename = req.body.candidatename; 
	var comments =req.body.comments; 

	var data = { 
		"name": name, 
		"email":email, 
		"candidatename":candidatename, 
		"comments":comments
	} 
db.collection('comments').insertOne(data,function(err, collection){ 
		if (err) throw err; 
		console.log("Record inserted Successfully"); 
			
	}); 
		
	return res.redirect('signup_success.html'); 
}) 


app.get('/',function(req,res){ 
res.set({ 
	'Access-control-Allow-Origin': '*'
	}); 
return res.redirect('index.html'); 
}).listen(8700) 


console.log("server listening at port 8700"); 
