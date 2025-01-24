const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

io.on('connection', (socket) => {
  console.log('a user connected');

  // Handle signaling for WebRTC
  socket.on('signal', (data) => {
    socket.broadcast.emit('signal', data);
  });

  // Handle chat messages
  socket.on('chat-message', (message) => {
    io.emit('chat-message', message);
  });

  // Handle game moves
  socket.on('game-move', (data) => {
    io.emit('game-move', data);
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

server.listen(5000, () => {
  console.log('Server is running on port 5000');
});