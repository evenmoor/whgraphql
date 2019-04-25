module.exports = (req, res) => {
	let pageContent = `
		<h1>WS Demo</h1>
		<ul data-chat-log>
		</ul>
			
		<p><input type='text' name='message' placeholder='message' data-message-content/> <button data-submit-message>Send</button></p>
		<script src="/scripts/socket.io/socket.io.js"></script>
		<script>
			var socket = io('/chat');
			var chatLog = document.querySelector('[data-chat-log]');
			var chatMessage = document.querySelector('[data-message-content]');
			var chatSubmit = document.querySelector('[data-submit-message]');

			socket.on('serverMessage', function(msg){
				chatLog.innerHTML += '<li>'+msg.type+' | '+msg.message+'</li>'
			});

			chatMessage.addEventListener('keyup', function(e){
				if(e.keyCode == 13){ chatSubmit.click(); }
			});

			chatSubmit.addEventListener('click', function(e){
				socket.emit('clientMessage', { type : 'chatMessage', data : { message : chatMessage.value } });
				chatMessage.value = '';
			});
		</script>
	`;

	res.send(pageContent);
};