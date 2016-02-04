var http = require('http');
var express = require('express');
var bodyParser = require('body-parser')
var mongoose = require('mongoose');

var app = express();

mongoose.connect('mongodb://localhost/reservation', function(err) {
  if (err) { throw err; }
});

mongoose.model('reservationCroc',  new mongoose.Schema({
	acheteur	: String,
	menu		: Number,
	croc1		: {nature : Boolean, jambon : Boolean, tomate: Boolean},
	croc2		: {nature : Boolean, jambon : Boolean, tomate: Boolean},
	prix		: Number,
	payer		: { type : Boolean, default : false},
	servi		: { type : Boolean, default : false},
	heure		: Number,
	date		: { type : Date, default : Date.now }
}));

var routes = require('./routes');

app.set('views','views');
app.set('view engine','jade');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(__dirname + '/public'));

app.use('/', routes);

var server = http.createServer(app);
server.listen(8080);
console.log('listen on port 8080');
