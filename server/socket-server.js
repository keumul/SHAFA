const http = require('http').createServer();
const io = require('socket.io')(http);
io.on('connection', (socket) => {
    console.log('A user connected');
  
    socket.on('disconnect', () => {
      console.log('A user disconnected');
    });
  
    socket.on('chat message', (message) => {
      console.log('Received message:', message);
      socket.broadcast.emit('chat message', message);
    });
  });

  const port = 3000; 
http.listen(port, () => {
  console.log(`Socket.IO server is listening on port ${port}`);
});