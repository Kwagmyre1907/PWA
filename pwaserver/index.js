const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
//const mysql = require('mysql');
//const events = require('./events');
//const connection = mysql.createConnection({
//  host     : 'kwagdb.cu4e5c070nig.eu-west-1.rds.amazonaws.com',
//  //port     : '3306',
//  user     : 'kwag',
//  password : 'Kwagmyre1907',
//  database : 'Test'

//});
//connection.connect();
const port = process.env.PORT || 8080;
const app = express()
  .use(cors())
  .use(bodyParser.json());

app.post('/apitest', function(req,res) {
  const body = req.body
  console.log(body)
  res.set('Content-Type', 'text/plain')
  res.send(body)
})

app.listen(port, () => {
  console.log(`Express server listening on port ${port}`);
});
