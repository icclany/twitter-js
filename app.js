var express = require( 'express' );
var app = express(); // creates an instance of an express application
var swig = require('swig'); //creates instance of swig
swig.setDefaults({cache: false}); // turn off swig's caching

// Log message upon connection
app.get("/", function(request, response) {
	response.render( 'index', {title: 'Hall of Fame', people: people} );
})

// Listen for requests
app.listen(3000, function() {
	console.log("Server listening.");
});

// Uses swig.renderFile as the function to render html
app.engine('html', swig.renderFile);

// Set the default view engine to html
app.set('view engine', 'html');

// Set the views path to our views folder
app.set('views', __dirname + '/views');

// Render index views example
var people = [{name: 'Full'}, {name: 'Stacker'}, {name: 'Son'}];

