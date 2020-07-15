var express=require("express");
var bodyParser=require('body-parser');
 
var connection = require('./config');
var app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.get('/', function(request, response) {
  response.sendFile(path.join(__dirname + '/register.html'));
});
app.post('/reg',function(req,res) {
    
    var users={
      "voterid":req.body.voterid,
      "firstname":req.body.firstname,
      "secondname":req.body.secondname,
      "lastname":req.body.lastname,
      "dob":req.body.dob,
      "age":req.body.age,
      "address":req.body.address,
    }
    connection.query('INSERT INTO user SET ?',users, function (error, results, fields) {
      if (error) {
        res.redirect('http://localhost:3000/');
        
      }else{
        res.redirect('http://127.0.0.1:5500/election/src/register.html');
    
      }
    });
});