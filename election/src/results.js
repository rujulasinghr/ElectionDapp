const http = require('http');
const mysql = require('mysql');

const pool = mysql.createPool({
  host: '127.0.0.1',
  user: 'root',
  password: 'pwdpwd',
  database: 'election',
  charset: 'utf8'
});

//html string that will be send to browser
var reo ='<html><head><title>Results</title></head><body style="background: url(https://cdn1.vectorstock.com/i/1000x1000/71/35/exploding-party-popper-background-vector-18447135.jpg);background-size:100% "><h1 align="center"><font size="7">ELECTION RESULTS!</font></h1><br><h1 align=center><font size="7">WINNER</font></h1><br style="line-height:3;"><br>{${table}}</body></html>';

//sets and returns html table with results from sql select
//Receives sql query and callback function to return the table
function setResHtml(sql, cb){
  pool.getConnection((err, con)=>{
    if(err) throw err;

    con.query(sql, (err, res, cols)=>{
      if(err) throw err;

      var table =''; //to store html table

      //create html table with data from res.
      
      table ='<h2 align=center>'+ '<h2 align=center>PARTY NUMBER-             '+res[0].partynum +'</h2><br> '+'<h2 align=center>Represented By</h2><h2 align=center>'+ res[0].firstname +'</h2>';

      con.release(); //Done with mysql connection

      return cb(table);
    });
  });
}

let sql ='SELECT partynum,firstname FROM candidate order by votes desc limit 1';

//create the server for browser access
const server = http.createServer((req, res)=>{
  setResHtml(sql, resql=>{
    reo = reo.replace('{${table}}', resql);
    res.writeHead(200, {'Content-Type':'text/html; charset=utf-8'});
    res.write(reo, 'utf-8');
    res.end();
  });
});

server.listen(8050, ()=>{
  console.log('Server running at //localhost:8050/');
});