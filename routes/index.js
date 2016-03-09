var express = require('express');
var router = express.Router();
// could use one line instead: var router = require('express').Router();
var tweetBank = require('../tweetBank');
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({extended: true})); // <= attaches request.body
router.use(bodyParser.json());



module.exports = function (io) {
	router.get('/', function (req, res) {
		var tweets = tweetBank.list();
		res.render( 'index', { title: 'Twitter.js', tweets: tweets, showForm: true } );
	});

	// Display all tweets for a specific user
	router.get('/users/:name', function(req, res) {
		var name = req.params.name;
		var list = tweetBank.find( {name: name} );
		res.render( 'index', { title: 'Twitter.js - Posts by '+name.toString(), tweets: list, userName: name.toString(), showForm: true} );
	});

	// Shows a page with a single tweet
	router.get('/tweets/:id', function(req, res) {
		var id = Number(req.params.id); // Since params id is a string, and id's are numbers
		var list = tweetBank.find( {id: id} ); //an array with name, text, id 
		var name = list[0].name;
		res.render( 'index', { title: 'Twitter.js - Posts by '+name.toString(), tweets: list, userName: name.toString(), showForm: true} );
	});

	// Post a tweet
	router.post('/tweets', function(req, res) {
		var name = req.body.name;
		var text = req.body.text;
		io.sockets.emit('new_tweet', { text: text, html: "<img src='https://pbs.twimg.com/profile_images/652151243322847232/AH96nB4f.jpg' height='48' width='48'><br><li><a href='/users/'"+name+"><b>"+name+"</b></a> - "+text+"</li>"});
		tweetBank.add(name, text);
		res.redirect('/');
	});
return router;
};