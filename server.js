var express = require('express'); 
var app = express();
var server = require('http').Server();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var linkify = require('linkifyjs');
var linkifyHtml = require('linkifyjs/html');



app.use('/scripts', express.static(__dirname + '/node_modules/'));

var clients = Array();

app.get('/', function(req, res) {
	res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket) {

	/***
	*
	* User connects
	* 
	* Note: Currently not shown to other users
	***/
	console.log('a user connected');

	/***
	*
	* User disconnects
	* 
	* Note: Currently not shown to other users
	***/
	socket.on('disconnect', function() {
		console.log('a user disconnected');
	});
	
	/***
	*
	* Broadcasts chat message
	* 
	*
	***/	
	socket.on('chat message', function(msg) {
		io.emit('chat message', msg);
	});
	
	/***
	*
	* Add player to queue
	* 
	*
	***/
	socket.on('queue', function() {
		
		var index = clients.indexOf(socket);
		
		// Player is not already in the queue...
		if (index == -1) {
			clients.push(socket);

			// How to get complete player in here?
			console.log('Player queued: (Socket ID: '+ socket.id +')');
		} else {
			console.log('Could not queue player - already in queue');
		}
		
	});
	
	/***
	*
	* Removes player from queue
	*
	*
	***/	
	socket.on('dequeue', function() {
		
		var index = clients.indexOf(socket);
		
		if (index > -1) {
			clients.splice(index, 1);
 
			console.log('Player de-queued: (ID: '+ socket.id +')');
		} else {
			console.log('Could not dequeue player - not found in queue');
		}
		
	});
	
});


/**
*
* Timer for initiating search job
*
***/
setInterval(function() { 
	
	console.log('Queue size: '+ clients.length);
	
	if (clients.length > 1) {
		var client = clients.pop();
		console.log('Client selected for matchmaking: (Socket ID:'+ client.id +')');
		
		// Redirect test
		var destination = 'qw://qw.foppa.dk:27501';

		client.emit('redirect', destination);
	}
	
}, 5000);


/**
*
* Start server and listen on port 3000
*
***/
http.listen(3000, function() {
	console.log('listening on *:3000');
});

