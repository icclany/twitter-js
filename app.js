var express = require( 'express' );
var app = express(); // creates an instance of an express application
var swig = require('swig') //creates instance of swig

// Log message upon connection
app.get("/", function(request, response) {
	response.send("Server listening.");
})


// Listen for requests
app.listen(3000, function() {
	console.log("Server listening.");
});


//Extra comment