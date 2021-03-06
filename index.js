//jshint esversion:6

const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');


const app = express();
app.use(bodyParser.urlencoded({extended: true}));


app.listen(3000, function(){
  console.log('Server started on port 3000');
});

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

app.post('/', function(req, res){
  var fiat = req.body.fiat;
  var crypto = req.body.crypto;
  var amount = req.body.amount;
  
  var baseUrl = 'https://apiv2.bitcoinaverage.com/convert/global';

  var options = {
    url: baseUrl,
    method: "GET",
    qs: {
      from: crypto,
      to: fiat,
      amount: amount,
    },
  }

  request(options, function(error, response, body){
    var data = JSON.parse(body);
    var price = data.price;
    var currentDate = data.time;

    res.writeHead(200, {'Content-Type': 'text/html'});

    res.write(`<h3>The time is currently ${currentDate}</h3>`);
    res.write(`<h1>The latest price for ${amount} ${crypto} is ${price}</h1>`);

    res.send();
  });
});
