const express = require('express');
const http = require('http');
const fs = require('fs');
const socketio = require('socket.io');

const app = express();
const httpServer = http.createServer(app).listen(4321);
const io = socketio.listen(httpServer);

app.get('/', (req, res) => {
    fs.readFile('soc.html', 'utf8', (err, data) => {
    	//res.writeHead(200, {'Content-type': 'text/html'});
	res.send(data);
    });
});

io.sockets.on('connection', (socket) => {
    socket.on('sendFromClient', (data) => {
    	io.sockets.emit('sendFromServer', data);
	//socket.broadcast.emit('sendFromServer', data);
	//socket.emit('sendFromServer', data);
	console.log('CHAT: ' + data);
    });
});

console.log('4321 port open');
