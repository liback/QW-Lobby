
module.exports = function(io) {

    var clients = Array();

    io.on('connection', function(socket) {

	    /***
	    *
	    * User connects
	    * 
	    * Note: Currently not shown to other users
	    ***/
	    console.log('a user connected (Socket ID: '+ socket.id +')');

	    /***
	    *
	    * User disconnects
	    * 
	    * Note: Currently not shown to other users
	    ***/
	    socket.on('disconnect', function() {
		    console.log('a user disconnected (Socket ID: '+ socket.id +')');
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
		    // This code currently only sends one of the players to game
		    // just to test the concept.
		    var client = clients.pop();
		    console.log('Client selected for matchmaking: (Socket ID:'+ client.id +')');
		
		    // Redirect test
		    var destination = 'qw://qw.foppa.dk:27501';

		    client.emit('redirect', destination);
	    }
	
    }, 5000);

}



