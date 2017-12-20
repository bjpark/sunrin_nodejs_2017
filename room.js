const express = require('express');
const http = require('http');
const fs = require('fs');
const socketio = require('socket.io');

const app = express();
const httpServer = http.createServer(app).listen(4321);
const io = socketio.listen(httpServer);

app.get('/', (req, res) => {
    fs.readFile('room.html', 'utf8', (err, data) => {
	res.send(data);
    });
});

let client_list = { room1: [], room2: [], room3: [] };
/**
* 1. join : 방 진입
* 2. sendmsg : 방 안에서 메시지전송
* 3. leave : 방 나가기
* 4. list : 방 사람 체크
*/

io.sockets.on('connection', (socket) => {
    socket.on('join', (data) => {
	// room / client
	socket.join(data.room);
	console.log(data);
	socket.room = data.room;
	socket.nickname = data.client;
	// 닉네임 중복 방지
	console.log(Object.keys(client_list));
	if (~Object.keys(client_list).indexOf(socket.room)) {
	    console.log(socket.room);
	    client_list[socket.room].push(socket.nickname);
    	    io.sockets.in(socket.room).emit('list', client_list[socket.room]);
	} else {
	    socket.emit('join', {'msg': 'error'});
	}
    });
    socket.on('sendMsg', function (data) {
    	let payload = {};
	payload.name = socket.nickname;
	payload.msg = data;
	io.sockets.in(socket.room).emit('sendMsg', payload);
    });
    socket.on('disconnect', function () {
    	if (socket && socket.room) {
	    let socket_idx = client_list[socket.room].indexOf(socket.nickname);
	    client_list[socket.room].splice(socket_idx, 1);
	    io.sockets.in(socket.room).emit('list', client_list[socket.room]);
	}
    });
});

console.log('4321 port open');
