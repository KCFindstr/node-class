let WebSocket = require('ws');

let wss = new WebSocket.Server({port: process.env.PORT || 8080 });
let currentMessage = '';

wss.on('connection', (ws) => {
	ws.send(currentMessage);
	ws.on('message', (message) => {
		currentMessage = message;
		wss.clients.forEach((client) => {
			if (ws != client) {
				client.send(message);
			}
		});
	});
});