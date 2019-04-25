// sockets.js
var socketio = require('socket.io')

module.exports.listen = function(app){
    const io = socketio.listen(app);

    //chat room
    const chat = io.of('/chat')
    chat.on('connection', function(socket){
        chat.emit('serverMessage', {
        	type : 'userConnected',
        	message : 'A user has connected to chat...'
    	});

    	socket.on('clientMessage', function(data){
	    	chat.emit('serverMessage', {
	    		type : 'newChatMessage',
	    		message : data.data.message
	    	});
	 	});

    	socket.on('disconnect', function(data){
			chat.emit('serverMessage', {
	        	type : 'userDisconnected',
	        	message : 'A user has disconnected from chat...'
	    	});
		});
    });

    

    //game updates
    const game = io.of('/play/game/updates');
    game.on('connection', function(socket){
    	//games need to be divided by game id so updates don't flow between games
    	console.log('connected to game update socket');
	   
	    socket.on('disconnect', function(data){
			console.log('game update socket disconnected');
		});
    });


    return io;
}